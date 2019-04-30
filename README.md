# SVG util

The helper utils(filter, clip etc...) for Programming SVG.


## Classes

* `SvgDefs` Class: to manage all reused elements in `defs` of an invisibale SVG.
* `SvgDef` Abstract Class: The reused element abstract class.
  * `LinearGradient` Class: the reused linear gradient to fill.
    * `stops`(*IGradientColor*): defines the ramp of colors to use on a gradient
      * `offset`:  defined the offset of a given gradient stop. 0.0-1.0 or 0%-100%
      * `stop-color`: The color attribute indicates what color to use at that gradient stop.
      * `stop-opacity`: defines the opacity of a given gradient stop.
  * `GrayscaleFilter` Class: the reused grayscale filter.
  * `BrightnessFilter` Class: adjust brightness filter.
    * slope(*number*):  >1 improve brightness; <1 reduce brightness: color*slope
  * `DropshadowFilter` Class: the reused drop shadow filter.
    **NOTE:** You should wrapper it to a group if you wanna apply multi-filters on one svg element.
    * id(*string*): optional to reuse the dropshadow filter.
      * **note**: the same `id` will share the same dropshadow filter.
    * dx(*number*), dy(*number*): the offset of the drop shadow.
  * `RoundedRectClip` Class: the reused rounded rect clip.
    * id(*string*): optional to reuse the rounded rect clip.
    * width(*number*), height(*number*): the 0-1 float number for width/height aspect ratio.
      * the aspect ratio keep 6 decimal places.
    * rx(*number*): the 0-1 float number to rounded corner radius for x.
    * ry(*number*): optional, the 0-1 float number to rounded corner radius for y(ry = rx if no settings).
    * **note**: the same `id` and the same `width/height ratio` will share the same `rounded rect clip`.
