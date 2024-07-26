# My personal website

This project is a resume / blog from myself. It uses the dev.to API for reading the blogs and showing here, but you can't really write blogs through here. 


## Template 
It starts from the template Blog with Comment from NextJS, but Redis and OAuth and local posts were completely removed from it. 

This project adds commenting functionality to [Next.js blog application](https://github.com/vercel/next.js/tree/canary/examples/blog) using Upstash and Auth0.

The comment box requires Auth0 authentication for users to add new comments. A user can delete their own comment. Also admin user can delete any comment.

Comments are stored in Serverless Redis ([Upstash](http://upstash.com/)).


## Prod

for prod access: https://brogni.dev 
