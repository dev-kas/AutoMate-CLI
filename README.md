# AutoMate-CLI

## Usage for Users
Get started with AutoMate-CLI by downloading the standalone files tailored for Linux, macOS, and Windows from the releases section.

## Development Notes
To build AutoMate-CLI, make sure you're using Node.js version 16 or lower. The reasons for this specific version requirement are not entirely clear.

For detailed information, refer to the `proto.km` file.

### CLI Options:
```sh
# Launch the interactive km interpreter
km
# Interpret and execute a file
km run <filename> <options>
# Options include:
# -r, --repeat <number>: Repeat the macro `number` times. Use 0 for infinite repetitions.
# Display basic command usage. -h or --help are both accepted. The command can be a string command name or undefined.
km <command> -h
```

### Upcoming Updates (subject to change):
```sh
# Compile the file into a standalone macro file.
# Options include:
# -r, --repeat <number>: Repeat the macro `number` times. Use 0 for infinite repetitions. This means the compiled macro file, when opened, will run `number` times without specifying.
km build <filename> <options>
# Record activity and save it to the specified filename.
# Current options include:
# -s, --schedule <ms>: Start recording after the specified time in milliseconds. Press ^C to stop recording.
km record <filename> <options>
```

## proto.km Overview
This file serves as a prototype for this language - AutoMate Script Prototype File.

### Comments:
Single-line comments start with "--", while multi-line comments are encapsulated within "--<" and ">--".

### Not Case Sensitive:
This language does not differentiate between uppercase and lowercase letters.

### Commands:
- **Move Mouse:** `MOVE <x> <y>` (Defaults: x and y to current position)
- **Click Mouse:** `CLICK <button> <x> <y> <state> <dbl>` (Defaults: button - left, x and y - current position, state - tap, dbl - false)
- **Press Key:** `KEY <key> <state>` (Defaults: state - tap)
- **Type String:** `TYPE <string>`
- **Wait:** `WAIT <duration>`

### Example:
```
MOVE 100 100
CLICK left 100 100
KEY k down
TYPE Hello, World!
WAIT 1000
```

## License
AutoMate-CLI is licensed under the MIT License. See the LICENSE file for details. Copyright © 2024 KAS (GitHub: https://github.com/dev-kas)
