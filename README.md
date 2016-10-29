Usage:

```
var sevenZip = require("7zip-standalone");

// For now, it supports only 2 methods.
sevenZip.add("D:/node/archive.7z", "D:/node/node-7zip-standalone/src/**/*");
sevenZip.extract("D:/node/archive.7z", "D:/node/archive/");
```

Tested on windows, linux and mac.