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
        const pq = new BinaryHeap(x => x[0]);
        for (const ch in count_chars)
            pq.push([count_chars[ch], ch]);

        while (pq.size() > 1) {
            const pair1 = pq.pop();
            const pair2 = pq.pop();
            pq.push([pair1[0] + pair2[0], [pair1[1], pair2[1]]]);
        }

        const tree = pq.pop();
        this.encoding = {};
        this.generateEncoding(tree[1], "");
    }

    encode(str) {
        let encoded = ""
        let arr = [];
        for (let i = 0; i < str.length; i++) {
            encoded += this.encoding[str[i]];

            if (encoded.length >= 8) {
                arr.push(parseInt(encoded.substring(0, 8), 2));
                encoded = encoded.substring(8);
            }
        }
        if (encoded.length > 0) {
            arr.push(parseInt(encoded, 2));
        }
        return arr;
    }

    generateEncoding(ary, prefix) {
        if (ary instanceof Array) {
            this.generateEncoding(ary[0], prefix + "0");
            this.generateEncoding(ary[1], prefix + "1");
        }
        else {
            this.encoding[ary] = prefix;
        }
    }
}

module.exports = HuffmanEncoding;