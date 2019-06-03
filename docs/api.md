## Functions

<dl>
<dt><a href="#compress">compress(trytes)</a> ⇒</dt>
<dd><p>Compress a trytes string and return a buffer of data.</p>
</dd>
<dt><a href="#decompress">decompress(buffer)</a> ⇒</dt>
<dd><p>Decompress the buffer back to a tryte string.</p>
</dd>
<dt><a href="#runLengthEncode">runLengthEncode(trytes)</a> ⇒</dt>
<dd><p>Run length encode the tryte string.</p>
</dd>
<dt><a href="#runLengthDecode">runLengthDecode(encoded)</a> ⇒</dt>
<dd><p>Decode the run length encoded trytes,</p>
</dd>
</dl>

<a name="compress"></a>

## compress(trytes) ⇒
Compress a trytes string and return a buffer of data.

**Kind**: global function  
**Returns**: A buffer of the compressed data.  

| Param | Description |
| --- | --- |
| trytes | The trytes to compress. |

<a name="decompress"></a>

## decompress(buffer) ⇒
Decompress the buffer back to a tryte string.

**Kind**: global function  
**Returns**: The tryte string.  

| Param | Description |
| --- | --- |
| buffer | The buffer to decompress. |

<a name="runLengthEncode"></a>

## runLengthEncode(trytes) ⇒
Run length encode the tryte string.

**Kind**: global function  
**Returns**: The run length encoded trytes.  

| Param | Description |
| --- | --- |
| trytes | The trytes to run length encode. |

<a name="runLengthDecode"></a>

## runLengthDecode(encoded) ⇒
Decode the run length encoded trytes,

**Kind**: global function  
**Returns**: The plain trytes.  

| Param | Description |
| --- | --- |
| encoded | The run length encoded data. |

