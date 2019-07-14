# HTML Processing

This repository is used as a playground to test different alternatives for HTML processing in Node.js

## parse5-html-rewriting-stream

see [documentation](https://github.com/inikulin/parse5/blob/master/packages/parse5-html-rewriting-stream/docs/index.md)

this module exposes a simple and efficient streaming SAX HTML parser

it seems that the business logic will be slightly harder to implement (so will have to be well-organized in terms of design to avoid spaghetti) but the streaming nature of this module will make is resource-light and efficient

## NOTES

- three main types of events (startTag, endTag, text)

## QUESTIONS

remains to see if this handles Unicode correctly and can handle the cases we're interested in