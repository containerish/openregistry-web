export default [
	{
		action: 'command',
		command: "mkdir example",
		transcription: "create directory"
	},
	{
		action: 'command',
		command: "cd example",
		transcription: "cd into directory"
	},
	{
		action: 'editor',
		command: 'vim README.md',
		content: "# Example\n\nThis is cool",
		lineNumbers: true,
		transcription: "open readme in editor",
		steps: [
			{ action: 'select', from: { line: 0, char: 0 }, to: { line: 0, char: 5 }, style: 'red', delay: 2000 },
			{ action: 'select', from: { line: 2, char: 1 }, to: { line: 3, char: 7 }, style: 'blue', delay: 2000 },
			{ action: 'append', text: "Add\nA few\nnew lines", transcription: 'append a few lines' },
			{ action: 'close', delay: 1000, transcription: 'save & close...' },
			{ action: 'select', style: 'red' },
			{ action: 'delete' },
			{ action: 'insert', text: '...' },
			{ action: 'replace' },
			{ action: 'multiple' }
		]
	},
	{
		action: 'command',
		command: 'echo "# Hello World!" > README.md',
		transcription: "create a readme file"
	},
	{
		action: 'wait',
		delay: 1000
	},
	{
		action: 'command',
		command: 'git init',
		transcription: "initialize git"
	},
	{
		action: 'command',
		command: 'ls -a',
		output: 'README.md    .git/'

	},
	{
		action: 'wait',
		delay: 1000
	},
	{
		action: 'command',
		command: 'git add .',
		transcription: "add all files to git"
	},
	{
		action: 'command',
		command: "git commit -m 'Initial commit'",
		transcription: "commit files to git"
	},
	{
		action: 'command',
		command: "git remote add origin git@github.com:username/example",
		transcription: "add a remote"
	},
	{
		action: 'command',
		command: "git push origin master",
		output: 'Done!',
		transcription: "sync changes with remote"
	},
]
