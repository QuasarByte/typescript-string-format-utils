
export class StringFormatUtils {

  /*
  Usage example: StringFormatUtils.formatStringWithNumericPlaceholders('{0} {1}', 'Hello', 'World!')
   */
  public static formatStringWithNumericPlaceholders(str: string, ...placeholders: string[]) {
    return str.replace(/{(\d+)}/g, (match, index) => placeholders[index] || '')
  }

  /*
  Usage example: StringFormatUtils.formatInSingleBrackets('{hello} {world}', {hello: 'Hello', world: 'World!'})
   */
  public static formatInSingleBrackets(str: string, placeholders) {
    return this.formatStringWithBracketsAndNamedPlaceholders(str, '{', '}', placeholders);
  }

  public static formatInDoubleBrackets(str: string, placeholders) {
    return this.formatStringWithBracketsAndNamedPlaceholders(str, '{{', '}}', placeholders);
  }

  public static formatStringWithBracketsAndNamedPlaceholders(str: string, leftBracket: string, rightBracket: string, placeholders) {
    for (var propertyName in placeholders) {
      var re = new RegExp( `${leftBracket}${propertyName}${rightBracket}`, 'gm');
      str = str.replace(re, placeholders[propertyName]);
    }
    return str;
  }

  /*
  Usage example: StringFormatUtils.sprintf('%s %s', 'Hello', 'World!')
   */
  public static sprintf(...args: any): string {
    const str: string = args[0];
    let i: number = 1;
    return str.replace(/%((%)|s|d)/g, function (m) {
      // m is the matched format, e.g. %s, %d
      var val = null;
      if (m[2]) {
        val = m[2];
      } else {
        val = args[i];
        // A switch statement so that the formatter can be extended. Default is %s
        switch (m) {
          case '%d':
            val = parseFloat(val);
            if (isNaN(val)) {
              val = 0;
            }
            break;
        }
        i++;
      }
      return val;
    });
  }

}
