const terminal = document.getElementById('terminal');
const inputLine = document.getElementById('input-line');

inputLine.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const cmd = inputLine.value.trim();

    terminal.innerHTML += `<br>guest@server ~ $ ${cmd}`;

    if(cmd === 'help') {
      terminal.innerHTML += '<br>Available commands: help, clear, date, echo [text], ping';
      
    } else if(cmd === 'clear') {
      terminal.innerHTML = 'Welcome to Fake Bash Shell<br>';
    
    } else if(cmd === 'date') {
      terminal.innerHTML += `<br>${new Date().toString()}`;

    } else if(cmd.startsWith('echo ')) {
      const echoText = cmd.slice(5);
      terminal.innerHTML += `<br>${echoText}`;

    } else if(cmd === 'ping') {
      terminal.innerHTML += '<br>PONG';



    } else if(cmd) {
      terminal.innerHTML += '<br>Command not found';
      }
    inputLine.value = '';
    terminal.scrollTop = terminal.scrollHeight;
  }
});
