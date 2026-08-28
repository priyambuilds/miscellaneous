#!/usr/bin/env node
import { Command } from 'commander';
const fs = require("fs");

const program = new Command();

program
  .name('my-cli')
  .description('A CLI application built with Commander.js')
  .version('1.0.0');

program.parse();

program
    .name('file')
    .description('A CLI application built with Commander.js')
    .argument('<file>',)
    .version("1.0")
    .action(async () => {
        try {
            fs.readFile(file, 'utf-8', (err, data) => {
                if (err) {
                    console.log("error", err)
                } else {
                    
                }
            })
        } catch {

        }
    })
