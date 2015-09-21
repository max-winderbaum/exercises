function sort(array) {
	var low = 0;
	var high = array.length - 1;
	function quickSort(array, low, high) {
		if(low < high) {
			var p = partition(array, low, high);
			quickSort(array, low, p - 1);
			quickSort(array, p + 1, high);
		}
	}

	quickSort(array, low, high);
	return array;
}

function partition(array, low, high) {

	// Start high to avoid O(n^2) on sorted arrays
	var pivot = array[high];
	var i = low;
	for(var j=low; j<high; j++ ) {
		if (array[j] <= pivot) {
			swap(array, i, j);
			i++;
		}
	}
	swap(array, i, high);
	return i;
}

function swap(array, index1, index2) {
	var tmp = array[index1];
	array[index1] = array[index2];
	array[index2] = tmp;
}

module.exports = sort;