const BinaryHeap = require("./binaryHeap");

class HuffmanEncoding {
    generateFrequency(input, freq) {
        for (let i = 0; i < input.length; i++) {
            if (!freq[input[i]]) {
                freq[input[i]] = 1;
            } else {
                freq[input[i]]++;
            }
        }

        return freq;
    }

    generateTree(count_chars) {
        var pq = new BinaryHeap(function (x) { return x[0]; });
        for (var ch in count_chars)
            pq.push([count_chars[ch], ch]);

        while (pq.size() > 1) {
            var pair1 = pq.pop();
            var pair2 = pq.pop();
            pq.push([pair1[0] + pair2[0], [pair1[1], pair2[1]]]);
        }

        var tree = pq.pop();
        this.encoding = {};
        this.generate_encoding(tree[1], "");
    }

    encode(str) {
        let encoded_string = ""
        let arr = [];
        for (var i = 0; i < str.length; i++) {
            encoded_string += this.encoding[str[i]];

            if (encoded_string.length >= 8) {
                arr.push(parseInt(encoded_string.substring(0, 8), 2));
                encoded_string = encoded_string.substring(8);
            }
        }
        if (encoded_string.length > 0) {
            arr.push(parseInt(encoded_string, 2));
        }
        return arr;
    }

    generate_encoding(ary, prefix) {
        if (ary instanceof Array) {
            this.generate_encoding(ary[0], prefix + "0");
            this.generate_encoding(ary[1], prefix + "1");
        }
        else {
            this.encoding[ary] = prefix;
        }
    }
}

module.exports = HuffmanEncoding;