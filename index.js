#!/usr/bin/env node
const path = require('path')
const program = require('commander');
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');
const symbols = require('log-symbols');
const fs = require('fs');

program.version('1.0.0', '-v, --version')
       .command('init <name>')
       .action((name) => {
            download('alexxxcs1/react_demo', name, {clone: true}, (err) => {
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
       });
program.parse(process.argv);