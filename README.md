Project Sif
=================

An entirely open source discord bot for your entertainment and moderation purposes.

**Project Sif** is edited every week, with at least one to two commands added in that time.
I test all of my commands thoroughly before uploading them to the main bot itself. The
bot is hosted on a public server, and is open to the public. Anyone can view my code and
suggest edits, report bugs, or suggest additional commands on the Github page.

Created by [Cannicide](https://cannicide.weebly.com/).


Commands List
------------

Commands are added and edited frequently. The default prefix is ?.
Format of commands list:\
`?command [option] [another option] [{optional option}]` - Description of command

***Entertainment***

`?coins [{user}]` - Checks your, or a specified user's, dollar balance\
`?meme` - Fetches a dank meme from reddit at the cost of 5 dollars (fake currency)\
`?roulette [bet] [color]` - Gets you money based on your bet and color (black/red/green)\
`?multiplier [add/view]` - Views or adds to your multiplier\
`?points [{user ID}]` - Views your or a specified user's guild points.\
`?hm [help/start/end/guess] [{letter}]` - For a solo game of Hangman!

***Functionality***

`?sif:core prefix [prefix]` - Changes prefix for a guild\
`?help` - Gives commands list and descriptions\
`?sifhelp` - Alias for help, prefix for this does not change\
`?info` - Gives info about the bot\
`?ls [item to get] [{value to set}]` - Gets or sets the value of a localstorage item. *Ls is a Dev-only command.*

***Moderation***

-No moderation commands exist for public use yet.

***Bot Functions Explained***

\-The bot gives you 0.25 "dollars" per message by default, your balance can be checked with `?coins`\
\-Multipliers can be bought with `?multiplier add`. Each multiplier costs 1000 times your current multiplier level, and each purchase doubles your multiplier.\
\-Buying multipliers can increase your dollars per message exponentially... my multiplier
is currently x36028797018963970, and I have 1486187877032263700 dollars. The more you upgrade
your multiplier, the harder it gets to upgrade again. However, I now have much more than what I need
to buy as many memes as I want, and to play as many rounds of roulette as I need :D\
\-Using the roulette, meme, and multiplier commands wisely will get you a lot of dollars.
\-Guild points track how many messages you have sent in guilds with Sif in them.\
\-A game of hangman can be started with `?hm start`, and you can begin guessing letters with `?hangman guess [letter]`. For help on using hangman commands, use `?hm help`.

***Latest Updates***

_Versions 2.0 through 2.3_\
\-Meme command updated to get a dank meme of the week, as opposed to month, in order to send you some newer memes!\
\-Added in more guild ranks\
\-Added in games of hangman!\
\-Edited hangman so it actually works\
\-Added in many more words into the word list for hangman\
\-Added game end command for hangman, to end a game early\
\-Added a feature that shows the correct answer in hangman upon running out of guesses or losing\
\-Updated help command with new commands\
\-Added new localstorage parameters for guild points and hangman\
\-Prevented the use of `?ls` on hangman to prevent cheating

_Versions 1.1 through 1.9_\
\-Roulette updated to make getting green harder (was too easy to earn coins earlier)\
\-Added guild points and guild ranks\
\-Added built-in command to view localstorage (tool for developers of Sif)\
\-Updated roulette command description to correct a factual error\
\-Updated multiplier command to double each multiplier on purchase instead of adding one\
\-Updated help command with the new commands\
\-Fixed guild rank being stuck at "Trainee"

_Version 1.0_\
\-Created bot\
\-Added basic commands\
\-Added help command to list basic commands\
\-Added `?sifhelp` command in cases of forgotten prefixes, in order to find what the prefix is

*Based off of my original discord bot, Project Maria.*



