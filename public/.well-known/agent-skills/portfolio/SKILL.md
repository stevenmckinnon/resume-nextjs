# Steve McKinnon Portfolio

Provides access to Steve McKinnon's professional profile and resume data via MCP (Model Context Protocol).

## Endpoint

POST https://stevemckinnon.co.uk/mcp

Content-Type: application/json

## Tools

### get_profile
Returns Steve McKinnon's professional summary, description, and location.

**Input:** No parameters required.

### get_experience
Returns complete work experience history including companies, titles, dates, and descriptions.

**Input:** No parameters required.

### get_skills
Returns a list of Steve McKinnon's technical skills.

**Input:** No parameters required.

### get_projects
Returns notable projects with descriptions, links, and technologies used.

**Input:** No parameters required.

### get_contact
Returns contact information including email and social media profiles.

**Input:** No parameters required.

## Protocol

MCP Streamable HTTP (2024-11-05)

Send JSON-RPC 2.0 requests to the endpoint above. Call `initialize` first, then `tools/list` to discover available tools, then `tools/call` to invoke them.
