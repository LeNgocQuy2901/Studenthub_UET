# Workspace Boundary & Sandboxing Policy

- **Allowed Root:** `d:\GitHub\Studenthub_UET\`
- **Permissions Inside Root:** Full autonomy (read, write, delete temporary/project files, edit, run development servers and commands).
- **Prohibited Outside Root:**
  - Strictly forbidden to read, write, create, move, or delete any files outside `d:\GitHub\Studenthub_UET\`.
  - Strictly forbidden to target external paths (e.g., `C:\`, `C:\Users\ADMIN\`, Windows directories, or other drives/folders).
  - Terminal commands must have `cwd` set inside `d:\GitHub\Studenthub_UET\` and must never execute path traversal (`..\..\`) or destructive commands (`rmdir /s /q`, `Remove-Item -Recurse -Force`, `del /s /q`) on external directories.
- **Exception:** Any action requiring access outside this directory must be halted and explicitly confirmed with the user first.
