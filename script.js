let nilaiDisplay = '0';
let ekspresi = '';
let harusResetDisplay = false;
let memori = 0;
let riwayat = [];

function putatSuara(tipe) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (tipe === 'angka') {
        oscillator.frequency.value = 400;
    } else if (tipe === 'operasi') {
        oscillator.frequency.value = 500;
    } else if (tipe === 'equals') {
        oscillator.frequency.value = 600;
    } else {
        oscillator.frequency.value = 350;
    }
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    putatSuara('fungsi');
}

function updateDisplay() {
    const displayElement = document.getElementById('display');
    displayElement.innerText = nilaiDisplay;
}

function updateExpression() {
    const expressionElement = document.getElementById('expression');
    expressionElement.innerText = ekspresi;
}

function inputAngka(num) {
    putatSuara('angka');
    
    if (harusResetDisplay) {
        nilaiDisplay = num;
        ekspresi = num;
        harusResetDisplay = false;
    } else {
        if (nilaiDisplay === '0') {
            nilaiDisplay = num;
        } else {
            nilaiDisplay = nilaiDisplay + num;
        }
        ekspresi = ekspresi + num;
    }
    updateDisplay();
    updateExpression();
}

function inputDesimal() {
    putatSuara('angka');
    
    if (harusResetDisplay) {
        nilaiDisplay = '0.';
        ekspresi = '0.';
        harusResetDisplay = false;
    } else {
        let angkaTerakhir = getAngkaTerakhir();
        if (!angkaTerakhir.includes('.')) {
            nilaiDisplay = nilaiDisplay + '.';
            ekspresi = ekspresi + '.';
        }
    }
    updateDisplay();
    updateExpression();
}

function getAngkaTerakhir() {
    let match = ekspresi.match(/[\d.]+$/);
    return match ? match[0] : '';
}

function inputOperasi(op) {
    putatSuara('operasi');
    
    let karakterTerakhir = ekspresi.slice(-1);
    if (['+', '-', '*', '/'].includes(karakterTerakhir)) {
        ekspresi = ekspresi.slice(0, -1) + op;
    } else if (ekspresi !== '' && nilaiDisplay !== '') {
        ekspresi = ekspresi + op;
    }
    
    let displayOp = op;
    if (op === '*') displayOp = '×';
    if (op === '/') displayOp = '÷';
    if (op === '-') displayOp = '−';
    
    nilaiDisplay = nilaiDisplay + ' ' + displayOp + ' ';
    updateDisplay();
    updateExpression();
}

function hitung() {
    putatSuara('equals');
    
    if (!ekspresi || ekspresi === '') return;
    
    try {
        let hasil = evaluasiEkspresi(ekspresi);

        if (!isFinite(hasil)) {
            alert('Tidak bisa membagi dengan nol!');
            hapusSemua();
            return;
        }
        
        if (hasil.toString().includes('.')) {
            hasil = parseFloat(hasil.toFixed(10));
        }
        
        simpanKeRiwayat(ekspresi, hasil);
        
        nilaiDisplay = hasil.toString();
        ekspresi = hasil.toString();
        harusResetDisplay = true;
        
        updateDisplay();
        updateExpression();
        
    } catch (error) {
        alert('Error dalam perhitungan!');
        hapusSemua();
    }
}

function evaluasiEkspresi(expr) {
    let tokens = [];
    let angkaSekarang = '';
    
    for (let i = 0; i < expr.length; i++) {
        let char = expr[i];
        
        if (char >= '0' && char <= '9' || char === '.') {
            angkaSekarang += char;
        } else if (['+', '-', '*', '/'].includes(char)) {
            if (angkaSekarang !== '') {
                tokens.push(parseFloat(angkaSekarang));
                angkaSekarang = '';
            }
            tokens.push(char);
        }
    }
    
    if (angkaSekarang !== '') {
        tokens.push(parseFloat(angkaSekarang));
    }
    
    let i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '*') {
            let hasil = tokens[i-1] * tokens[i+1];
            tokens.splice(i-1, 3, hasil);
        } else if (tokens[i] === '/') {
            let hasil = tokens[i-1] / tokens[i+1];
            tokens.splice(i-1, 3, hasil);
        } else {
            i++;
        }
    }
    
    i = 0;
    while (i < tokens.length) {
        if (tokens[i] === '+') {
            let hasil = tokens[i-1] + tokens[i+1];
            tokens.splice(i-1, 3, hasil);
        } else if (tokens[i] === '-') {
            let hasil = tokens[i-1] - tokens[i+1];
            tokens.splice(i-1, 3, hasil);
        } else {
            i++;
        }
    }
    
    return tokens[0];
}

function hapusSemua() {
    putatSuara('fungsi');
    nilaiDisplay = '0';
    ekspresi = '';
    harusResetDisplay = false;
    updateDisplay();
    updateExpression();
}

function hapusEntry() {
    putatSuara('fungsi');
    nilaiDisplay = '0';
    updateDisplay();
}

function backspace() {
    putatSuara('fungsi');
    
    if (ekspresi.length > 0) {
        ekspresi = ekspresi.slice(0, -1);
        nilaiDisplay = ekspresi || '0';
        updateDisplay();
        updateExpression();
    }
}

function toggleTanda() {
    putatSuara('fungsi');

    if (nilaiDisplay !== '0' && !nilaiDisplay.includes('+') && !nilaiDisplay.includes('×') && !nilaiDisplay.includes('÷') && !nilaiDisplay.includes('−')) {
        if (nilaiDisplay.startsWith('-')) {
            nilaiDisplay = nilaiDisplay.slice(1);
            ekspresi = nilaiDisplay;
        } else {
            nilaiDisplay = '-' + nilaiDisplay;
            ekspresi = '-' + ekspresi;
        }
        updateDisplay();
        updateExpression();
    }
}

function memoriHapus() {
    putatSuara('fungsi');
    memori = 0;
    updateMemoryIndicator();
}

function memoriPanggil() {
    putatSuara('fungsi');
    
    if (memori !== 0) {
        nilaiDisplay = memori.toString();
        ekspresi = memori.toString();
        harusResetDisplay = true;
        updateDisplay();
        updateExpression();
    }
}

function memoriTambah() {
    putatSuara('fungsi');
    
    let nilaiSekarang = nilaiDisplay;
    if (ekspresi !== '') {
        try {
            nilaiSekarang = evaluasiEkspresi(ekspresi).toString();
        } catch (e) {
            nilaiSekarang = getAngkaTerakhir();
        }
    }
    memori = memori + parseFloat(nilaiSekarang);
    updateMemoryIndicator();
}

function memoriKurang() {
    putatSuara('fungsi');
    
    let nilaiSekarang = nilaiDisplay;
    if (ekspresi !== '') {
        try {
            nilaiSekarang = evaluasiEkspresi(ekspresi).toString();
        } catch (e) {
            nilaiSekarang = getAngkaTerakhir();
        }
    }
    memori = memori - parseFloat(nilaiSekarang);
    updateMemoryIndicator();
}

function memoriSimpan() {
    putatSuara('fungsi');
    
    let nilaiSekarang = nilaiDisplay;
    if (ekspresi !== '') {
        try {
            nilaiSekarang = evaluasiEkspresi(ekspresi).toString();
        } catch (e) {
            nilaiSekarang = getAngkaTerakhir();
        }
    }
    memori = parseFloat(nilaiSekarang);
    updateMemoryIndicator();
}

function updateMemoryIndicator() {
    const indicator = document.getElementById('memoryIndicator');
    if (memori !== 0) {
        indicator.innerText = 'M';
    } else {
        indicator.innerText = '';
    }
}

function toggleHistory() {
    putatSuara('fungsi');
    const historyPanel = document.getElementById('historyPanel');
    historyPanel.classList.toggle('show');
}

function simpanKeRiwayat(expr, hasil) {
    let displayExpr = expr.replace(/\*/g, '×').replace(/\//g, '÷').replace(/-/g, '−');
    
    const itemRiwayat = {
        expression: displayExpr,
        result: hasil
    };
    
    riwayat.unshift(itemRiwayat);
    
    if (riwayat.length > 5) {
        riwayat.pop();
    }
    
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    
    if (riwayat.length === 0) {
        historyList.innerHTML = '<p class="no-history">Tidak ada riwayat</p>';
        return;
    }
    
    historyList.innerHTML = '';
    
    for (let i = 0; i < riwayat.length; i++) {
        const item = riwayat[i];
        const historyDiv = document.createElement('div');
        historyDiv.className = 'history-item';
        historyDiv.onclick = function() {
            putatSuara('angka');
            nilaiDisplay = item.result.toString();
            ekspresi = item.result.toString();
            harusResetDisplay = true;
            updateDisplay();
            updateExpression();
        };
        
        const expressionDiv = document.createElement('div');
        expressionDiv.className = 'history-expression';
        expressionDiv.innerText = item.expression + ' =';
        
        const resultDiv = document.createElement('div');
        resultDiv.className = 'history-result';
        resultDiv.innerText = item.result;
        
        historyDiv.appendChild(expressionDiv);
        historyDiv.appendChild(resultDiv);
        historyList.appendChild(historyDiv);
    }
}

function hapusRiwayat() {
    putatSuara('fungsi');
    riwayat = [];
    updateHistoryDisplay();
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        inputAngka(key);
    }
    
    if (key === '+') {
        inputOperasi('+');
    }
    if (key === '-') {
        inputOperasi('-');
    }
    if (key === '*') {
        inputOperasi('*');
    }
    if (key === '/') {
        event.preventDefault();
        inputOperasi('/');
    }

    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        hitung();
    }

    if (key === 'Escape') {
        hapusSemua();
    }

    if (key === 'Backspace') {
        event.preventDefault();
        backspace();
    }
    
    if (key === '.' || key === ',') {
        inputDesimal();
    }
});

updateDisplay();
updateExpression();