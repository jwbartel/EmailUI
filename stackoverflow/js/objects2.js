
var StringBuilder = function (value) {
    this.strings = new Array("");
    this.append(value);
}

// Appends the given value to the end of this instance.
StringBuilder.prototype.append = function (value) {
    if (value)
    {
        this.strings.push(value);
    }

}
// Clears the string buffer
StringBuilder.prototype.clear = function () {
    this.strings.length = 1;
}
// Converts this instance to a String.
StringBuilder.prototype.toString = function () {
    return this.strings.join("");
}

var Contact = function(json) {
    this.name = json.name;
    this.emailAddress = json.emailAddress;
    Contact.all[this.name] = this;
}

Contact.all = {}; 

var SOQuestion = function(json) {
    this.bodyText = json.bodyText;
    this.title = json.title;
    this.score = json.score;
    this.tags = json.tags;
    this.poster = json.poster;
    this.answers = json.answers;
}