// Form definitions for the event payload builder. The payloads themselves come from
// @sls-testing/core; this module only maps form fields to each builder's overrides.
import {
  buildApiGatewayEvent,
  buildApiGatewayV1Event,
  buildDynamoDBStreamEvent,
  buildEventBridgeEvent,
  buildS3Event,
  buildSNSEvent,
  buildSQSEvent,
} from "@sls-testing/core";

// The library's defaults; used to build ARNs from the names typed into the form.
const DEFAULT_REGION = "us-east-1";
const DEFAULT_ACCOUNT_ID = "123456789012";

export type FieldValues = Record<string, string>;

export type Field =
  | { key: string; label: string; kind: "text"; placeholder?: string; hint?: string }
  | { key: string; label: string; kind: "select"; options: string[]; hint?: string }
  | { key: string; label: string; kind: "json"; rows?: number; hint?: string };

export type EventSource = {
  id: string;
  label: string;
  builder: string;
  isHttp: boolean;
  fields: Field[];
  defaults: FieldValues;
  build: (overrides: Record<string, unknown>) => unknown;
  // The overrides passed to the @sls-testing builder, also printed in the generated test.
  overrides: (values: FieldValues) => Record<string, unknown>;
};

export type ParsedJson = { ok: true; value: unknown } | { ok: false; error: string };

export function parseJson(text: string): ParsedJson {
  if (!text.trim()) return { ok: true, value: undefined };
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch (error) {
    return { ok: false, error: (error as Error).message };
  }
}

// Invalid JSON is passed through as a raw string, the same way the library treats string bodies.
function jsonOrRaw(text: string): unknown {
  const parsed = parseJson(text);
  return parsed.ok ? parsed.value : text;
}

function parseQuery(text: string): Record<string, string> | null {
  const trimmed = text.trim().replace(/^\?/, "");
  if (!trimmed) return null;
  return Object.fromEntries(
    trimmed
      .split("&")
      .filter(Boolean)
      .map((pair) => {
        const [k, ...rest] = pair.split("=");
        return [decodeURIComponent(k), decodeURIComponent(rest.join("="))];
      }),
  );
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : value === undefined ? [] : [value];
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const apiGatewayV2: EventSource = {
  id: "apigw-v2",
  label: "API Gateway HTTP API (v2)",
  builder: "buildApiGatewayEvent",
  isHttp: true,
  fields: [
    { key: "method", label: "Method", kind: "select", options: httpMethods },
    { key: "path", label: "Path", kind: "text", placeholder: "/orders/123" },
    { key: "query", label: "Query string", kind: "text", placeholder: "page=2&limit=10" },
    { key: "body", label: "Body (JSON)", kind: "json", rows: 6 },
  ],
  defaults: { method: "POST", path: "/orders", query: "", body: '{\n  "orderId": "abc-123",\n  "amount": 99.9\n}' },
  build: buildApiGatewayEvent,
  overrides: (v) => {
    const query = parseQuery(v.query);
    const body = jsonOrRaw(v.body);
    return {
      method: v.method,
      path: v.path || "/",
      ...(query ? { queryStringParameters: query } : {}),
      ...(body !== undefined ? { body } : {}),
    };
  },
};

const apiGatewayV1: EventSource = {
  id: "apigw-v1",
  label: "API Gateway REST API (v1)",
  builder: "buildApiGatewayV1Event",
  isHttp: true,
  fields: apiGatewayV2.fields,
  defaults: { method: "GET", path: "/orders/abc-123", query: "", body: "" },
  build: buildApiGatewayV1Event,
  overrides: (v) => {
    const query = parseQuery(v.query);
    const body = jsonOrRaw(v.body);
    return {
      httpMethod: v.method,
      path: v.path || "/",
      requestContext: { httpMethod: v.method, path: v.path || "/" },
      ...(query
        ? {
            queryStringParameters: query,
            multiValueQueryStringParameters: Object.fromEntries(Object.entries(query).map(([k, val]) => [k, [val]])),
          }
        : {}),
      ...(body !== undefined ? { body } : {}),
    };
  },
};

const sqs: EventSource = {
  id: "sqs",
  label: "SQS",
  builder: "buildSQSEvent",
  isHttp: false,
  fields: [
    { key: "queue", label: "Queue name", kind: "text", placeholder: "orders-queue" },
    {
      key: "receiveCount",
      label: "ApproximateReceiveCount",
      kind: "select",
      options: ["1", "2", "3", "5"],
      hint: "Above 1 means this is a retry. Useful for testing poison-message handling.",
    },
    {
      key: "bodies",
      label: "Message bodies (JSON array, one item per record)",
      kind: "json",
      rows: 8,
    },
  ],
  defaults: {
    queue: "orders-queue",
    receiveCount: "1",
    bodies: '[\n  { "orderId": "abc-123", "amount": 99.9 },\n  { "orderId": "def-456", "amount": 12.5 }\n]',
  },
  build: buildSQSEvent,
  overrides: (v) => ({
    records: asArray(jsonOrRaw(v.bodies)).map((body) => ({
      body,
      ...(v.receiveCount !== "1" ? { attributes: { ApproximateReceiveCount: v.receiveCount } } : {}),
      ...(v.queue && v.queue !== "test-queue"
        ? { eventSourceARN: `arn:aws:sqs:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:${v.queue}` }
        : {}),
    })),
  }),
};

const sns: EventSource = {
  id: "sns",
  label: "SNS",
  builder: "buildSNSEvent",
  isHttp: false,
  fields: [
    { key: "topic", label: "Topic name", kind: "text", placeholder: "order-events" },
    { key: "message", label: "Message (JSON)", kind: "json", rows: 6 },
  ],
  defaults: { topic: "order-events", message: '{\n  "type": "ORDER_PLACED",\n  "orderId": "abc-123"\n}' },
  build: buildSNSEvent,
  overrides: (v) => ({
    records: [
      {
        message: jsonOrRaw(v.message),
        ...(v.topic ? { topicArn: `arn:aws:sns:${DEFAULT_REGION}:${DEFAULT_ACCOUNT_ID}:${v.topic}` } : {}),
      },
    ],
  }),
};

const s3: EventSource = {
  id: "s3",
  label: "S3",
  builder: "buildS3Event",
  isHttp: false,
  fields: [
    {
      key: "eventName",
      label: "Event name",
      kind: "select",
      options: ["ObjectCreated:Put", "ObjectCreated:Post", "ObjectCreated:CompleteMultipartUpload", "ObjectRemoved:Delete"],
    },
    { key: "bucket", label: "Bucket", kind: "text", placeholder: "uploads-bucket" },
    { key: "key", label: "Object key", kind: "text", placeholder: "invoices/2026/abc-123.pdf", hint: "S3 URL-encodes keys in events: spaces arrive as '+'." },
  ],
  defaults: { eventName: "ObjectCreated:Put", bucket: "uploads-bucket", key: "invoices/2026/abc-123.pdf" },
  build: buildS3Event,
  overrides: (v) => ({
    ...(v.bucket ? { bucket: v.bucket } : {}),
    ...(v.key ? { key: v.key } : {}),
    ...(v.eventName !== "ObjectCreated:Put" ? { eventName: v.eventName } : {}),
  }),
};

const eventBridge: EventSource = {
  id: "eventbridge",
  label: "EventBridge",
  builder: "buildEventBridgeEvent",
  isHttp: false,
  fields: [
    { key: "source", label: "Source", kind: "text", placeholder: "com.acme.orders" },
    { key: "detailType", label: "Detail type", kind: "text", placeholder: "OrderPlaced" },
    { key: "detail", label: "Detail (JSON)", kind: "json", rows: 6 },
  ],
  defaults: {
    source: "com.acme.orders",
    detailType: "OrderPlaced",
    detail: '{\n  "orderId": "abc-123",\n  "customerId": "cus-42"\n}',
  },
  build: buildEventBridgeEvent,
  overrides: (v) => ({
    source: v.source || "test.source",
    "detail-type": v.detailType || "TestDetailType",
    detail: asRecord(jsonOrRaw(v.detail)) ?? {},
  }),
};

const dynamoStream: EventSource = {
  id: "dynamodb-stream",
  label: "DynamoDB Streams",
  builder: "buildDynamoDBStreamEvent",
  isHttp: false,
  fields: [
    { key: "eventName", label: "Event name", kind: "select", options: ["INSERT", "MODIFY", "REMOVE"] },
    { key: "keys", label: "Keys (plain JSON)", kind: "json", rows: 3 },
    { key: "newImage", label: "New image (plain JSON, marshalled for you)", kind: "json", rows: 5 },
    { key: "oldImage", label: "Old image (plain JSON)", kind: "json", rows: 5 },
  ],
  defaults: {
    eventName: "MODIFY",
    keys: '{ "pk": "ORDER#abc-123" }',
    newImage: '{\n  "pk": "ORDER#abc-123",\n  "status": "SHIPPED",\n  "amount": 99.9\n}',
    oldImage: '{\n  "pk": "ORDER#abc-123",\n  "status": "PAID",\n  "amount": 99.9\n}',
  },
  build: buildDynamoDBStreamEvent,
  overrides: (v) => {
    const keys = asRecord(jsonOrRaw(v.keys));
    const newImage = asRecord(jsonOrRaw(v.newImage));
    const oldImage = asRecord(jsonOrRaw(v.oldImage));
    return {
      records: [
        {
          eventName: v.eventName,
          ...(keys ? { keys } : {}),
          ...(newImage ? { newImage } : {}),
          ...(oldImage ? { oldImage } : {}),
        },
      ],
    };
  },
};

export const eventSources: EventSource[] = [apiGatewayV2, apiGatewayV1, sqs, sns, s3, eventBridge, dynamoStream];

// Renders a value as a JS object literal: unquoted keys where valid, two-space indent.
export function toJsLiteral(value: unknown, indent = 0): string {
  const json = JSON.stringify(value, null, 2) ?? "undefined";
  const unquoted = json.replace(/"([A-Za-z_$][\w$]*)":/g, "$1:");
  const pad = " ".repeat(indent);
  return unquoted
    .split("\n")
    .map((line, i) => (i === 0 ? line : pad + line))
    .join("\n");
}

export function buildSnippet(source: EventSource, values: FieldValues): string {
  const args = toJsLiteral(source.overrides(values), 2);
  const call = `const event = ${source.builder}(${args})`;
  const testName = source.isHttp
    ? `should respond successfully when ${values.method} ${values.path || "/"} is called`
    : `should process the ${source.label} event when it arrives`;
  const assertion = source.isHttp
    ? "  expect(result).toHaveStatusCode(200)"
    : "  // Assert on what your handler did at its boundary: a DB row, a published message, ...";

  return `import { ${source.builder}, buildLambdaContext } from '@sls-testing/core'
import '@sls-testing/jest'
import { handler } from './handler'

it('${testName}', async () => {
  ${call}

  const result = await handler(event, buildLambdaContext())

${assertion}
})
`;
}
