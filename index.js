/**
 * Figma MCP status (checked 2026-05-01):
 * - Configured in .cursor/mcp.json as "Framelink MCP for Figma" (package: figma-developer-mcp, stdio).
 * - Uses env FIGMA_API_KEY; in this environment the variable is set (ready for the server to start).
 * - Cursor MCP resources listing for this workspace returned none (this server may not expose browseable resources).
 * Runtime connection is managed by Cursor when the MCP server starts from mcp.json.
 */
console.log('Hello');
