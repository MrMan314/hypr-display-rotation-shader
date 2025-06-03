//
// display rotation
// 

precision highp float;
varying vec2 v_texcoord;
uniform sampler2D tex;
uniform float time;

// all i remember
const float pi = 3.1415926535897932384626433832795028841971693993751058;

const float aspect_ratio = 16.0/9.0;
const float aspect_ratio_inverse = 9.0/16.0;

const mat4 yuv = mat4(0.299, 0.587, 0.114, 0,
	-0.14713, -0.28886, 0.436, 0,
	0.615, -0.51499, -0.10001, 0,
	0, 0, 0, 1);
const mat4 rgb = mat4(1, 0, 1.13983, 0,
	1, -0.39465, -0.58060, 0,
	1, 2.03211, 0, 0,
	0, 0, 0, 1);

void main() {
	vec2 coord = v_texcoord;

//	float t = atan(aspect_ratio_inverse); // angle for maximal line length
	float t = time/100.0;
	float cr = time;

	mat2 rot = mat2(cos(t), -sin(t), sin(t), cos(t));
	mat4 colorrot = mat4(1, 0, 0, 0,
			0, cos(cr), -sin(cr), 0,
			0, sin(cr), cos(cr), 0,
			0, 0, 0, 1);

	// shift to center for easier working
	coord -= 0.5;
	
	coord.y *= aspect_ratio_inverse;

	coord *= rot;

	coord.y *= aspect_ratio;

	coord += 0.5;

	vec4 pixColor = (coord.y > 1.0 || coord.x < 0.0 || coord.x > 1.0 || coord.y < 0.0)
 ? vec4(0.0) : texture2D(tex, coord);

	gl_FragColor = pixColor * yuv * colorrot * rgb;
}
