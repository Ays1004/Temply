# Temply - Instant SaaS Frontend Templates from the CLI

🚀 **Temply** is a developer-first CLI tool that helps you scaffold modern SaaS UIs with beautiful, customizable templates, in seconds.

Whether you're launching a dashboard, auth flow, or landing page, Temply lets you choose from a growing library of production-ready templates and themes, all optimized for fast customization and clean code.

## Features

✨ **Interactive CLI Experience** - Beautiful prompts with colored output and loading spinners  
🎨 **Multiple Templates** - Choose from Minimal, Analytics, and Ecommerce themes  
📦 **Auto Dependency Installation** - Optional npm install after project creation  
🛡️ **Error Handling** - Graceful error handling with helpful troubleshooting tips  
⚡ **Fast Setup** - Get a fully working SaaS project in under a minute  
🎯 **Production Ready** - All templates are optimized for deployment  

## Quick Start

### Installation

```bash
# Install globally via npm
npm install -g temply-cli

# Or run directly with npx (recommended)
npx temply-cli
```

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd Temply

# Install dependencies
npm install

# Run the CLI
node cli.js
```

### Usage

1. **Run the CLI**:
   ```bash
   npx temply-cli
   # or if installed globally
   temply-cli
   ```

2. **Follow the interactive prompts**:
   - Enter your project name (default: `my-saas-app`)
   - Choose a template:
     - 🔷 **Minimal** - Clean and simple starter
     - 🟡 **Analytics** - Coming soon...
     - 🟣 **Ecommerce** - Full-featured e-commerce
   - Choose whether to run `npm install` automatically

3. **Start developing**:
   ```bash
   cd your-project-name
   npm run dev
   ```

## Available Templates

### 🔷 Minimal Template
- Clean, modern Next.js starter
- Basic layout and styling
- Perfect for simple SaaS projects
- Includes essential components

### 🟣 Ecommerce Template  
- Full-featured e-commerce setup
- Product listings and cart functionality
- Responsive design
- Payment integration ready

### 🟡 Analytics Template *(Coming Soon)*
- Dashboard with charts and metrics
- Data visualization components
- Admin panel ready

## CLI Options

The CLI provides an interactive experience with the following prompts:

| Prompt | Description | Default |
|--------|-------------|---------|
| Project name | Name of your new project | `my-saas-app` |
| Template | Choose from available templates | `minimal` |
| Install deps | Run npm install automatically | `Yes` |

## Requirements

- **Node.js** >= 16.0.0
- **npm** or **yarn**
- Internet connection (for dependency installation)

## Project Structure

After running the CLI, your project will have this structure:

```
your-project/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── [static assets]
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## Error Handling

The CLI includes comprehensive error handling:

- ✅ **Project name validation** - Ensures valid directory names
- ✅ **Duplicate directory check** - Prevents overwriting existing projects  
- ✅ **Template validation** - Verifies template exists before copying
- ✅ **Dependency installation** - Graceful fallback if npm install fails
- ✅ **Clear error messages** - Helpful troubleshooting tips

## Development

### Adding New Templates

1. Create a new folder in `/templates/` with your template name
2. Add your template files (must include `package.json`)
3. Update the `THEMES` object in `cli.js` to include your new template
4. Test the CLI with your new template

### Dependencies

- **inquirer** - Interactive command line prompts
- **fs-extra** - Enhanced file system operations  
- **chalk** - Terminal string styling
- **ora** - Elegant terminal spinners
- **execa** - Process execution

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Create an issue on GitHub for bug reports
- 💬 Join our community for support and updates
- 📖 Check the documentation for detailed guides

---

**Happy coding!** 🚀
