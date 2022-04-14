const child = require('child_process')


var cpu = child.execSync(String.raw`echo $[100-$(vmstat 1 2|tail -1|awk '{print $15}')]"%"`)
var ram = child.execSync(String.raw`awk '/^Mem/ {printf("%s\n", $3);}' <(free -h)`);
var ip = child.execSync(String.raw`ip r list | grep default | awk -F 'via|dev' 'FNR == 1 {print $2}'`)

var monitores_conectados = child.execSync(String.raw`xrandr | grep " connected" | awk '{ print $1 }'`)
var monitores_ativos = child.execSync(String.raw`xrandr --listactivemonitors | grep -E '[0-9]+:' | awk '{ print $4 }'`)

console.log('Uso da CPU: ', cpu.toString())
console.log('Memória RAM: ', ram.toString())
console.log('Endereço IP: ', ip.toString())

console.log('Monitores Conectados: ', monitores_conectados.toString().trim().split('\n'))
console.log('Monitores Ativos: ', monitores_ativos.toString().trim().split('\n'))

