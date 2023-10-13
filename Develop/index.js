//packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const { error } = require('console');
const { renderLicenseBadge, renderLicenseSection, generateMarkdown } = require('./utils/generateMarkdown');
// Title of the README
// Description, installation instructions, usage information, contribution guidelines, and test instructions.
// licesense
// Github username
// email address
// instructions on how to reach me 


//  Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'projectTitle',
        message: 'What is the title of your project?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license for your project:',
        choices: ['MIT', 'GPL-3.0', 'Apache-2.0', 'BSD-2-Clause', 'CC-BY-SA-4.0', 'EPL-2.0', 'Mozilla-2.0', 'Unlicense'],
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the purpose of your project?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'motivation',
        message: 'What was your motivation for this project?',
    },
    {
        type: 'input',
        name: 'problemSolved',
        message: 'What problem does it solve?',
    },
    {
        type: 'input',
        name: 'whatLearned',
        message: 'What did you learn?',
    },
    {///optional 
        type: 'confirm',
        name: 'tableofcontents?',
        message: ' If your README is long, add a table of contents to make it easy for users to find what they need.Do you want to include a Table of Contents in your README? ',
        default: false,
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.',

    },
    {
        type: 'string',
        name: 'usage',
        message: 'To add a screenshot, create an `assets/images` folder in your repository and upload your screenshot to it. Then, using the relative filepath, add it to your README using the following syntax:\n\n```md\n![alt text](assets/images/screenshot.png)\n```',
    },
    {
        type: 'input',
        name: 'credits',
        message: 'List your collaborators, if any, with links to their GitHub profiles.\n\nIf you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section.\n\nIf you followed tutorials, include links to those here as well.',
    },
    {
        type: 'confirm',
        name: 'Features',
        message: 'If your project has a lot of features, list them here... DO YOU WANT TO LIST THEM?',
        default: false,

    },
    {
        type: 'confirm',
        name: 'How to Contribute',
        message: 'If you created an application or package and would like other developers to contribute it, you can include guidelines for how to do so. Do you want to include future contributions?',
        default: false,
    },
    {
        type: 'input',
        name: 'Tests',
        message: 'Go the extra mile and write tests for your application. Then provide examples on how to run them here.',

    },
];

// function to write README file
function writeTo(fileName, data, callback) {
    fs.writeFile(fileName, data, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log('README.md successfully created')
        }
        if (callback) {
            callback(error);
        }
    });
}

// function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            console.log('Answers received:', answers);

            let readmeContent = `# ${answers.projectTitle}\n\n## Description\n${answers.description}\n\n` +
                `## Motivation\n${answers.motivation}\n\n` +
                `## Build Reason\n${answers.buildReason}\n\n` +
                `## Problem Solved\n${answers.problemSolved}\n\n` +
                `## What I Learned\n${answers.whatLearned}\n\n`;

            // Optional Table of Contents
            if (answers['tableofcontents?']) {
                readmeContent += '## Table of Contents\n\n';
                if (answers.installation) {
                    readmeContent += `- [Installation](#installation)\n`;
                }
                if (answers.usage) {
                    readmeContent += `- [Usage](#usage)\n`;
                }
                if (answers.credits) {
                    readmeContent += `- [Credits](#credits)\n`;
                }
                if (answers.license) {
                    readmeContent += `- [License](#license)\n`;
                }
            }
            // Installation, Usage, Credits
            readmeContent += `## Installation\n\n${answers.installation}\n\n` +
                `## Usage\n\n${answers.usage}\n\n` +
                `## Credits\n\n${answers.credits}\n\n`;

            // License Section
            const licenseBadge = `[![License](https://img.shields.io/badge/license-${answers.license}-brightgreen)](https://opensource.org/licenses/${answers.license})`;
            const licenseSection = `## License\n\nThis project is licensed under the [${answers.license}](https://opensource.org/licenses/${answers.license}) license.\n\n`;
            readmeContent += `${licenseBadge}\n\n${licenseSection}\n\n`;

            if (answers.Features) {
                readmeContent += `## Features\n\nAdd your features here...\n\n`;
            }
            if (answers['How to Contribute']) {
                readmeContent += `## How to Contribute\n\nProvide guidelines for contributions...\n\n`;
            }
            readmeContent += `## Tests\n\n${answers.Tests}\n`;
            readmeContent += `## Questions\n\nYou can find me on GitHub as [${answers.githubUsername}](https://github.com/${answers.githubUsername}). ` +
                `Feel free to reach out to me at ${answers.email} with any additional questions.\n`;
            const fileName = 'README.md'
            writeTo(fileName, readmeContent);
        })
        .catch((error) => {
            console.error(error);
        });
}
// Function call to initialize app
init(); 