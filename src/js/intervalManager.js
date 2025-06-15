// Simpan semua interval ID
let allIntervals = [];

export function clearAllIntervals() {
	allIntervals.forEach(clearInterval);
	allIntervals = [];
}

export function addInterval(fn, delay) {
	const id = setInterval(fn, delay);
	allIntervals.push(id);
	return id;
}
