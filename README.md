# Dart Getters And Setters
## Automatically Generate Getters And Setters
-------------------

[![Version](https://vsmarketplacebadge.apphb.com/version/PeterHdd.dartgettersetter.svg)](https://marketplace.visualstudio.com/items?itemName=PeterHdd.dartgettersetter)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/PeterHdd.dartgettersetter.svg)](https://marketplace.visualstudio.com/items?itemName=PeterHdd.dartgettersetter)
![issues](https://img.shields.io/github/issues/peterhdd/gettersetter)
![tweet](https://img.shields.io/twitter/url/https/github.com/PeterHdd/gettersetter.svg?style=social)
![license](https://img.shields.io/github/license/peterhdd/gettersetter)

## Installation

You can either install it from vscode or from the following link:

https://marketplace.visualstudio.com/items?itemName=PeterHdd.dartgettersetter

## Information

This vscode extension will automatically create the getters and setters for the fields in the dart file.

## Usage

Select the fields you want, right click and click on *Generate Getter And Setter*:

![example-image](images/examplegetset.png)

```
String _name;
int _age;

 String get name => _name;

 set name(String value) => _name = value;

 int get age => _age;

 set age(int value) => _age = value;
 ```