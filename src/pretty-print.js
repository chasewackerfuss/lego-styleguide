import {inject, customAttribute} from 'aurelia-framework';

@customAttribute('prettyprint')
@inject(Element)
export class PrettyPrint {
  constructor(el) {
    this.el = el;
  }

  attached() {
    var modified;
    this.el.innerHTML = cleanBrackets(this.el.innerHTML);
    this.el.innerText = prettyPre(this.el.innerText);
    this.el.innerHTML = PR.prettyPrintOne(this.el.innerHTML);
  }
}

function cleanBrackets(input) {
  return input.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
}

function prettyPre(text) {
  var context = {
    ignoreExpression: /\s/
  };
  // use the first line as a baseline for how many unwanted leading whitespace characters are present
  var superfluousSpaceCount = 0;
  var currentChar = text.substring( 0, 1 );

  while ( context.ignoreExpression.test( currentChar ) ) {
    currentChar = text.substring( ++superfluousSpaceCount, superfluousSpaceCount + 1 );
  }

  // split
  var parts = text.split( "\n" );
  var reformattedText = "";

  // reconstruct
  var length = parts.length;
  for ( var i = 0; i < length; i++ ) {
    // cleanup, and don't append a trailing newline if we are on the last line
    reformattedText += parts[i].substring( superfluousSpaceCount ) + ( i == length - 1 ? "" : "\n" );
  }

  return reformattedText;
}
