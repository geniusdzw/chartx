## 什么是Chord diagrams

Chord diagrams 用来表示一组实体之间的关系，比如，一群拥有不同发色的人，有黑色的，金色的，褐色的和红色的四中不同颜色的头发，这个人群中的每个人，都有一个心仪的发色(黑色头发的人不一定就喜欢黑色头发，也可能喜欢金色头发)。
 

假如有100个人头发是黑色的，其中40%（40）的人喜欢头发的颜色一致都依然觉得黑色头发的人好看， 但是还有很多时候这种喜欢并不对称，比如有10%的金色头发的人喜欢黑色头发的人，但是却有20%黑色头发的人是喜欢金色头发人的 。


Chord diagrams 是以可视化的方式来描述这种关系。在一个圆弧内通过二次贝塞尔曲线来建立链接关系，source 和 target 用来表示整个人群中的两色不同发色组成的子人群。这样，多少黑色头发的人喜欢金色头发的人，多少金色头发的人喜欢黑色头发的人，以及其他的喜欢关系，褐色喜欢金色，金色喜欢褐色..... 都可以在这个Chord diagrams上得到很好的描述。

## Chord diagrams的数据 matrix

chord的关系需要一个n*n的矩阵来描述。


[

 [ 10,  20, 30, 40],

 [ 11,  21, 31, 41],

 [ 12,  22, 32, 42],

 [ 13,  23, 33, 43]

]

这个矩阵中的每一行，代表一个发色的人群，比如第一行的代表所有黑色头发的人群。而矩阵中的列i，代表着该人群中的共同爱好子人群，并且，列索引i对应着这个子人群喜欢的头发颜色人群的行。
