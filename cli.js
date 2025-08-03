#!/usr/bin/env node

/**
 * SaaS Starter CLI Tool
 * A powerful CLI to bootstrap your SaaS application with pre-built templates
 */

import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Available themes with their colors
const THEMES = {
  minimal: { name: 'Minimal', color: chalk.cyan },
  analytics: { name: 'Analytics', color: chalk.yellow },
  ecommerce: { name: 'Ecommerce', color: chalk.magenta }
};

/**
 * Display welcome banner with ASCII art
 */
function displayBanner() {
  console.clear();
  console.log(chalk.magentaBright(`
  ███████╗ █████╗  █████╗ ███████╗    ███████╗████████╗ █████╗ ██████╗ ████████╗███████╗██████╗ 
  ██╔════╝██╔══██╗██╔══██╗██╔════╝    ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
  ███████╗███████║███████║███████╗    ███████╗   ██║   ███████║██████╔╝   ██║   █████╗  ██████╔╝
  ╚════██║██╔══██║██╔══██║╚════██║    ╚════██║   ██║   ██╔══██║██╔══██╗   ██║   ██╔══╝  ██╔══██╗
  ███████║██║  ██║██║  ██║███████║    ███████║   ██║   ██║  ██║██║  ██║   ██║   ███████╗██║  ██║
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
  `));
  
  console.log(chalk.bold.white('🚀 Welcome to the SaaS Starter CLI!'));
  console.log(chalk.gray('   Bootstrap your next SaaS application in seconds\n'));
}

/**
 * Get user inputs through interactive prompts
 */
async function getUserInputs() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: chalk.cyan('🏗️  What is your project name?'),
      default: 'my-saas-app',
      validate: (input) => {
        if (!input.trim()) {
          return 'Project name cannot be empty';
        }
        if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
          return 'Project name can only contain letters, numbers, hyphens, and underscores';
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'theme',
      message: chalk.cyan('🎨 Choose your SaaS template:'),
      choices: [
        {
          name: `${THEMES.minimal.color('●')} ${THEMES.minimal.name} - Clean and simple starter`,
          value: 'minimal'
        },
        {
          name: `${THEMES.analytics.color('●')} ${THEMES.analytics.name} - Coming soon...`,
          value: 'analytics',
          disabled: 'Not available yet'
        },
        {
          name: `${THEMES.ecommerce.color('●')} ${THEMES.ecommerce.name} - Full-featured e-commerce`,
          value: 'ecommerce'
        }
      ]
    },
    {
      type: 'confirm',
      name: 'installDeps',
      message: chalk.cyan('📦 Do you want me to run npm install for you?'),
      default: true
    }
  ]);

  return answers;
}

/**
 * Check if project directory already exists
 */
function checkProjectExists(projectName) {
  const projectPath = path.resolve(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`❌ Error: Directory "${projectName}" already exists!`));
    console.log(chalk.yellow(`   Please choose a different project name or remove the existing directory.`));
    process.exit(1);
  }
  return projectPath;
}

/**
 * Copy template files to the new project directory
 */
async function copyTemplate(theme, projectPath, projectName) {
  const templatePath = path.join(__dirname, 'templates', theme);
  
  // Check if template exists
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template "${theme}" not found at ${templatePath}`);
  }

  const spinner = ora({
    text: chalk.blue(`📁 Copying ${THEMES[theme].color(THEMES[theme].name)} template files...`),
    color: 'blue'
  }).start();

  try {
    // Copy all files from template to project directory
    await fs.copy(templatePath, projectPath);
    
    // Update package.json with the new project name
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
    }

    spinner.succeed(chalk.green(`✅ Template files copied successfully!`));
  } catch (error) {
    spinner.fail(chalk.red(`❌ Failed to copy template files`));
    throw error;
  }
}

/**
 * Install npm dependencies
 */
async function installDependencies(projectPath) {
  const spinner = ora({
    text: chalk.blue('📦 Installing dependencies... This might take a few minutes'),
    color: 'blue'
  }).start();

  try {
    await execa('npm', ['install'], {
      cwd: projectPath,
      stdio: 'pipe'
    });
    
    spinner.succeed(chalk.green('✅ Dependencies installed successfully!'));
  } catch (error) {
    spinner.fail(chalk.red('❌ Failed to install dependencies'));
    console.log(chalk.yellow('   You can install them manually by running: npm install'));
    console.log(chalk.gray(`   Error: ${error.message}`));
  }
}

/**
 * Display success message and next steps
 */
function displaySuccess(projectName, theme) {
  console.log('\n');
  
  // Success header
  console.log(chalk.bgGreen.black.bold('                    SUCCESS!                    '));
  console.log('');
  
  console.log(chalk.green.bold(`🎉 Your SaaS project "${projectName}" has been created!`));
  console.log(chalk.gray(`   Using the ${THEMES[theme].color(THEMES[theme].name)} template\n`));
  
  // Next steps box
  console.log(chalk.bgBlue.white.bold('                  NEXT STEPS                   '));
  console.log('');
  console.log(chalk.cyan.bold('1.') + chalk.white(` Navigate to your project:`));
  console.log(chalk.yellow(`   cd ${projectName}`));
  console.log('');
  console.log(chalk.cyan.bold('2.') + chalk.white(` Start the development server:`));
  console.log(chalk.yellow(`   npm run dev`));
  console.log('');
  console.log(chalk.cyan.bold('3.') + chalk.white(` Open your browser and visit:`));
  console.log(chalk.yellow(`   http://localhost:3000`));
  console.log('');
  
  // Additional tips
  console.log(chalk.bgMagenta.white.bold('                     TIPS                      '));
  console.log('');
  console.log(chalk.white('• Check out the README.md for detailed setup instructions'));
  console.log(chalk.white('• Customize the template to match your brand'));
  console.log(chalk.white('• Join our community for support and updates'));
  console.log('');
  
  console.log(chalk.gray('Happy coding! 🚀\n'));
}

/**
 * Handle errors gracefully
 */
function handleError(error) {
  console.log('\n');
  console.log(chalk.bgRed.white.bold('                     ERROR                     '));
  console.log('');
  console.log(chalk.red.bold('❌ Something went wrong:'));
  console.log(chalk.red(`   ${error.message}`));
  console.log('');
  console.log(chalk.yellow('💡 Troubleshooting tips:'));
  console.log(chalk.white('   • Make sure you have Node.js installed (v16+)'));
  console.log(chalk.white('   • Check your internet connection for npm install'));
  console.log(chalk.white('   • Ensure you have write permissions in this directory'));
  console.log(chalk.white('   • Try running with sudo if on macOS/Linux (not recommended)'));
  console.log('');
  console.log(chalk.gray('If the problem persists, please create an issue on our GitHub repository.\n'));
  process.exit(1);
}

/**
 * Main CLI function
 */
async function main() {
  try {
    // Display welcome banner
    displayBanner();
    
    // Get user inputs
    const { projectName, theme, installDeps } = await getUserInputs();
    
    // Check if project already exists
    const projectPath = checkProjectExists(projectName);
    
    console.log('\n');
    console.log(chalk.blue.bold(`🏗️  Creating your SaaS project...`));
    console.log(chalk.gray(`   Project: ${projectName}`));
    console.log(chalk.gray(`   Template: ${THEMES[theme].name}`));
    console.log(chalk.gray(`   Location: ${projectPath}\n`));
    
    // Copy template files
    await copyTemplate(theme, projectPath, projectName);
    
    // Install dependencies if requested
    if (installDeps) {
      await installDependencies(projectPath);
    }
    
    // Display success message
    displaySuccess(projectName, theme);
    
  } catch (error) {
    handleError(error);
  }
}

// Run the CLI
main();