# Diagram Management Guide

This guide explains how to create, edit, and manage Draw.io diagrams for the Strategiz documentation.

---

## 📁 Diagram Organization

Diagrams are stored in the **source repositories** and synced to the docs site:

### Strategiz Core
```
strategiz-core/
└── docs/diagrams/
    ├── architecture-overview.drawio.png
    ├── layered-architecture.drawio.png
    ├── provider-connection-flow.drawio.png
    └── ...
```

### Strategiz UI
```
strategiz-ui/
├── docs/diagrams/              # High-level UI diagrams
│   ├── auth/
│   │   ├── signin-flow.drawio.png
│   │   └── signup-flow.drawio.png
│   └── screens/
│       └── dashboard-flow.drawio.png
└── src/features/
    └── auth/docs/diagrams/     # Feature-specific diagrams
        ├── signin-passkey-flow.drawio.png
        └── signup-step1.drawio.png
```

---

## 🎨 Creating Diagrams

### 1. Install Draw.io

**Desktop App** (Recommended):
- Download: https://www.drawio.com/
- Supports offline editing
- Better performance

**VS Code Extension**:
- Extension: "Draw.io Integration"
- Edit directly in VS Code

### 2. Create a New Diagram

1. Open Draw.io
2. Create your diagram
3. Use Strategiz brand colors:
   - Primary: `#39FF14` (Neon Green)
   - Secondary: `#00BFFF` (Neon Blue)
   - Accent: `#BF00FF` (Neon Purple)
   - Background: `#1a1a1a` (Dark)
   - Text: `#FFFFFF` (White)

### 3. Export as Editable PNG

**Critical**: Must export as `.drawio.png` to remain editable!

1. File → Export as → PNG
2. ✅ Check **"Include a copy of my diagram"**
3. ✅ Set Border Width: 10px (optional)
4. ✅ Set Transparent Background (optional)
5. Save with `.drawio.png` extension

**Example filename**: `signin-flow.drawio.png`

---

## 📝 Workflow

### Adding a New Diagram

1. **Create** the diagram in Draw.io
2. **Export** as `.drawio.png`
3. **Save** to the appropriate source repository:
   - Core: `/strategiz-core/docs/diagrams/`
   - UI (high-level): `/strategiz-ui/docs/diagrams/`
   - UI (feature): `/strategiz-ui/src/features/{feature}/docs/diagrams/`

4. **Sync** to docs site:
   ```bash
   cd strategiz-docs
   ./scripts/sync-diagrams.sh
   ```

5. **Reference** in MDX:
   ```mdx
   ![Signin Flow](/diagrams/strategiz-ui/auth/signin-flow.drawio.png)
   ```

6. **Commit** changes:
   ```bash
   # In source repo (strategiz-core or strategiz-ui)
   git add docs/diagrams/signin-flow.drawio.png
   git add src/features/auth/docs/signin-screen.mdx
   git commit -m "docs: Add signin flow diagram"

   # In docs repo (strategiz-docs)
   git add static/diagrams/strategiz-ui/auth/signin-flow.drawio.png
   git add docs/strategiz-ui/auth/signin-screen.mdx
   git commit -m "docs: Update signin screen with flow diagram"
   ```

### Editing an Existing Diagram

1. **Open** the `.drawio.png` file in Draw.io
2. **Edit** the diagram
3. **Export** with same settings (Include a copy of my diagram)
4. **Overwrite** the existing file
5. **Sync** to docs site: `./scripts/sync-diagrams.sh`
6. **Commit** the updated diagram

---

## 🔄 Syncing Diagrams

The sync script copies diagrams from source repos to the docs site.

### Manual Sync

```bash
cd /Users/cuztomizer/Documents/GitHub/strategiz-docs
./scripts/sync-diagrams.sh
```

### Automatic Sync (Recommended)

Add to your docs build process:

```json
{
  "scripts": {
    "prebuild": "./scripts/sync-diagrams.sh",
    "prestart": "./scripts/sync-diagrams.sh",
    "build": "docusaurus build",
    "start": "docusaurus start"
  }
}
```

---

## 📖 Referencing in MDX

### Basic Image

```mdx
![Architecture Overview](/diagrams/strategiz-core/architecture-overview.drawio.png)
```

### With Caption

```mdx
<figure>
  <img
    src="/diagrams/strategiz-ui/auth/signin-flow.drawio.png"
    alt="Sign In Flow"
  />
  <figcaption>Complete sign-in flow with multiple authentication methods</figcaption>
</figure>
```

### Responsive Size

```mdx
<img
  src="/diagrams/strategiz-core/provider-connection-flow.drawio.png"
  alt="Provider Connection Flow"
  style={{maxWidth: '100%', height: 'auto'}}
/>
```

---

## ✨ Best Practices

### File Naming

- Use kebab-case: `provider-connection-flow.drawio.png`
- Be descriptive: `oauth-social-login-sequence.drawio.png`
- Always include `.drawio.png` extension

### Diagram Design

**Layout**:
- Left-to-right for sequences
- Top-to-bottom for hierarchies
- Use swim lanes for multi-actor flows
- Consistent spacing (20-30px)

**Components**:
- Rounded rectangles for processes
- Cylinders for databases
- Clouds for external services
- Arrows with labels for data flow

**Typography**:
- Font: Roboto or Arial
- Title: 16-18pt Bold
- Labels: 12-14pt Regular

---

## 🗂️ Diagram Inventory

### Strategiz Core

| Diagram | File | Location |
|---------|------|----------|
| High-Level Architecture | `architecture-overview.drawio.png` | `docs/diagrams/` |
| Layered Architecture | `layered-architecture.drawio.png` | `docs/diagrams/` |
| Provider Connection Flow | `provider-connection-flow.drawio.png` | `docs/diagrams/` |
| Portfolio Aggregation | `portfolio-aggregation-flow.drawio.png` | `docs/diagrams/` |
| Authentication Flow | `authentication-flow.drawio.png` | `docs/diagrams/` |
| OAuth Pattern | `oauth-pattern.drawio.png` | `docs/diagrams/` |
| Module Dependencies | `module-dependencies.drawio.png` | `docs/diagrams/` |
| Deployment Architecture | `deployment-architecture.drawio.png` | `docs/diagrams/` |

### Strategiz UI

| Diagram | File | Location |
|---------|------|----------|
| UI Architecture | `architecture-overview.drawio.png` | `docs/diagrams/` |
| Sign In Flow | `signin-flow.drawio.png` | `docs/diagrams/auth/` |
| Sign Up Flow | `signup-flow.drawio.png` | `docs/diagrams/auth/` |
| Passkey Setup | `passkey-setup.drawio.png` | `docs/diagrams/auth/` |
| TOTP Setup | `totp-setup.drawio.png` | `docs/diagrams/auth/` |
| Social OAuth | `social-oauth-callback.drawio.png` | `docs/diagrams/auth/` |
| Provider OAuth | `provider-oauth-callback.drawio.png` | `docs/diagrams/auth/` |
| Dashboard Flow | `dashboard-user-flow.drawio.png` | `docs/diagrams/screens/` |

---

## 🛠️ Troubleshooting

### Diagram won't open in Draw.io

**Problem**: "Invalid file" error
**Solution**: Ensure file has `.drawio.png` extension and was exported with "Include a copy of my diagram"

### Diagram doesn't appear in docs

**Problem**: 404 on diagram image
**Solution**:
1. Check file exists in source repo
2. Run sync script: `./scripts/sync-diagrams.sh`
3. Verify path in MDX matches actual path

### Diagram quality is poor

**Problem**: Blurry or pixelated
**Solution**:
1. In Draw.io, go to File → Export as → PNG
2. Set Zoom to 200% for retina displays
3. Re-export

---

## 📚 Resources

- **Draw.io Website**: https://www.drawio.com/
- **Documentation**: https://www.drawio.com/doc/
- **Templates**: https://www.drawio.com/blog/diagram-templates
- **Keyboard Shortcuts**: https://www.drawio.com/shortcuts

---

**Last Updated**: 2025-10-26
**Maintained by**: Strategiz Engineering Team
