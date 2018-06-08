#Let's try and get a training set out of these files again...
files.v <- dir("~/github/Howit-Fison-Search-Project/howFisPapers", full.names = T)
library(XML)
pairs.l <- lapply(files.v, function(x){
  doc <- xmlTreeParse(x, useInternalNodes = T) #import xml file
  #Now we need to get all the anchor elements.
  a.ns <- getNodeSet(doc, "//d:div[@class='page-content']//d:a", namespaces = c(d = "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"))
})
