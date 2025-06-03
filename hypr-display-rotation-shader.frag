//
// display rotation
// 

precision highp float;
varying vec2 v_texcoord;
uniform sampler2D tex;

// all i remember
const float pi = 3.1415926535897932384626433832795028841971693993751058;

const float aspect_ratio = 16.0/9.0;
const float aspect_ratio_inverse = 9.0/16.0;

void main() {
	vec2 coord = v_texcoord;

	float t = float(atan(aspect_ratio_inverse)); // angle for maximal line length

	mat2 rot = mat2(cos(t), -sin(t), sin(t), cos(t));

	// shift to center for easier working
	coord -= 0.5;
	
	coord.y *= aspect_ratio_inverse;

	coord *= rot;

	coord.y *= aspect_ratio;

	coord += 0.5;

	vec4 pixColor = texture2D(tex, coord);

	gl_FragColor = pixColor;
}
