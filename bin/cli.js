#!/usr/bin/env node

const program = require('commander');

program
  .command('dev <browser>', 'dev extension')
  .command('build <browser>', 'build extension')
  .parse(process.argv);