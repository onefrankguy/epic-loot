#!/usr/bin/env ruby

require 'rake'
require 'rake/clean'

CLEAN.include 'game.zip'

MAX_SIZE = 13 * 1024

task :default => :test

desc "Make sure the game isn't too big"
task :test do
  sh 'zip -r game.zip . -i@manifest.txt'
  size = File.size('game.zip')
  puts "zip size: #{size} bytes (used #{percent size}%)"
  fail 'zip file too big!' if size > MAX_SIZE
end

def percent size
  (size.to_f / MAX_SIZE.to_f * 100).to_i
end
