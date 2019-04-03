#!/usr/bin/env node
const path = require('path')
const program = require('commander');
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const fs = require('fs');
const inquirer = require('inquirer');

program.version('1.0.5', '-v, --version')
       .command('init <name>')
       .action((name) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'ScaffoldingName',
                    message: '请输入脚手架的版本'
                }
            ]).then((answers) => {
                var demourl='';
                if (answers.ScaffoldingName) {
                    switch (answers.ScaffoldingName) {
                        case 'react_demo':
                            demourl = 'alexxxcs1/react_demo';
                            break;
                        case 'cr':
                            console.log(demourl,answers.ScaffoldingName);
                            demourl = 'alexxxcs1/custom_react';
                            break;
                        case 'ic':
                            console.log(demourl,answers.ScaffoldingName);
                            demourl = 'alexxxcs1/ice_react';
                            break;
                        default:
                            console.log(demourl,answers.ScaffoldingName);
                            demourl = 'alexxxcs1/react_demo';
                            break;
                    }
                }else{
                    demourl = 'alexxxcs1/react_demo';
                }
                console.log(demourl,answers.ScaffoldingName);
                
                download(demourl, name, {clone: true}, (err) => {
                    if (err) {
                        spinner.fail();
                        console.log(symbols.error, chalk.red(err))
                    }else
                    {
                        spinner.succeed();
                        
                        try {
                            fs.unlink('./'+name+'/README.md',function(){
                                console.log(symbols.success, chalk.green('清理完成','./'+name+'/README.md'));
                            });
                            fs.unlink('./'+name+'/.gitattributes',function(){
                                console.log(symbols.success, chalk.green('清理完成','./'+name+'/.gitattributes'));
                            });
                        } catch (error) {
                            console.log(symbols.error, chalk.red(error))
                        }
                        console.log(symbols.success, chalk.green('项目初始化完成'));
                    }
                })
                const spinner = ora('正在下载模板...');
                spinner.start();
            })

            
       });
program.parse(process.argv);