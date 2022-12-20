const katex = require('katex');

module.exports = class MarkDownParser {
    constructor(){}

    parseMarkdown(markdownText) {
        let regex = /\$(.*?)\$|([^$]+)/g;
        let replaced = markdownText.replace(regex, (match, group1, group2) => {
            if (group1) {
                // If group1 is defined, then the match was between $ and $
                return katex.renderToString(group1, { throwOnError: false, trust: true });
            } else {
                // Otherwise, the match was outside $ and $
                return `<p>${group2}</p>`;
            }
        }).replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
            .replace(/\\htmlTag\{([^}]+)\}\{([^}]+)\}/, "<$1>$2</$1>");

        return replaced;
    }

}