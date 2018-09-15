# Howitt-Fison-Search-Project
A search engine that can be used to find Australian words in the Howitt-Fison Corpus, even though their spelling is inconsistent.

## Getting Started
To use the search engine on your local machine, you need to have installed python (or something else that allows you to simulate a web server). You will also need a folder called 'HowFisPapers' that contains the latest export from the Howitt-Fison Corpus, as listed in the 'ingest-corpus.js' file. This folder needs to be in the same place as the code in this repository.

Find the directory where you have stored the code from this project along with the Howitt-Fison papers, and then simulate a web server on your machine:

### On a Mac:
Open the Terminal. If the directory where you had stored this code was ~/directory, you would then type these commands:
```
cd ~/directory
python -m http.server 8000 &.
```
### On a PC:
Open Command Prompt. If the directory where you had stored this code was C:\\directory, you would then type these commands:
```
cd C:\\directory
python -m http.server 8000 &.
```

Once you have started a local server, open your browser of choice (ideally a modern browser like Chrome or Firefox), and navigate to http://localhost:8000 You should see the landing page for the search engine.

## How the engine works
The search engine is designed specifically to deal with the inconsistent spellings of Australian words in the Howitt-Fison corpus. It does so by accounting for a number of known sound equivalences. For example, no Australian language has a voicing contrast&mdash;there is no difference between 'b' and 'p' or 'g' and 'k'. Therefore it is common for the same word to be spelt sometimes with 'b' and sometimes with 'p', and so on.

The search engine deals with these inconsistencies by transforming your search term into a regular expression. If you ask it to look for `Parramatta`, it will convert the `p` at the start into a `(?:b|p)`, meaning "b or p", for example.

You can search for a single word or for a phrase. The search ignores whether letters are upper or lower case.

## How to interpret the results
The search engine finds all possible matches for your term, based on the sound transformations it is currently able to understand. It then performs a string matching function on each term to measure how close it is to what you typed.

In the list of results, you will see:
- **Hit:** The word or phrase that the engine has found which it thinks matches what you searched for.
- **String Distance Score:** This is the ['Levenshtein' or 'Edit' distance](https://en.wikipedia.org/wiki/Levenshtein_distance). The lower the value, the more letters are the same between what you searched and the word the engine found. Closer matches appear at the top of the results.
- **Context:** An excerpt from the document, with the matched word highlighted.
- **Document:** The name of the document where the match was found.

## Authors
- **Michael Falk**, [michaelgfalk](https://github.com/michaelgfalk)

## Acknowledgments
- **Andrei Mackenzie**, for his Levenshtein distance script.

## Licence
Copyright 2018 Michael Falk and Rachel Henderey

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
