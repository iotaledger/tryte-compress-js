## Functions

<dl>
<dt><a href="#compressTrytes">compressTrytes(trytes)</a> ⇒</dt>
<dd><p>Compress a trytes string and return a buffer of data.</p>
</dd>
<dt><a href="#compress">compress(trytes)</a> ⇒</dt>
<dd><p>Compress a trytes array and return a buffer of data.</p>
</dd>
<dt><a href="#decompressTrytes">decompressTrytes(bytes)</a> ⇒</dt>
<dd><p>Decompress a binary buffer back to trytes string.</p>
</dd>
<dt><a href="#decompress">decompress(bytes)</a> ⇒</dt>
<dd><p>Decompress a binary buffer back to binary trytes buffer.</p>
</dd>
</dl>

<a name="compressTrytes"></a>

## compressTrytes(trytes) ⇒
Compress a trytes string and return a buffer of data.

**Kind**: global function  
**Returns**: A buffer of the compressed data.  

| Param | Description |
| --- | --- |
| trytes | The trytes to compress as uint 8 array. |

<a name="compress"></a>

## compress(trytes) ⇒
Compress a trytes array and return a buffer of data.

**Kind**: global function  
**Returns**: A buffer of the compressed data.  

| Param | Description |
| --- | --- |
| trytes | The trytes to compress as binary data. |

<a name="decompressTrytes"></a>

## decompressTrytes(bytes) ⇒
Decompress a binary buffer back to trytes string.

**Kind**: global function  
**Returns**: The trytes as a string.  

| Param | Description |
| --- | --- |
| bytes | The trytes to compress as uint 8 array. |

<a name="decompress"></a>

## decompress(bytes) ⇒
Decompress a binary buffer back to binary trytes buffer.

**Kind**: global function  
**Returns**: The tryte string.  

| Param | Description |
| --- | --- |
| bytes | The buffer to decompress. |

