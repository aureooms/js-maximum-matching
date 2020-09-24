import test from 'ava';
import {enumerate} from '@aureooms/js-itertools';

import maximumCardinalityMatching from '../../src/cardinality';
import blossom from '../../src/core/blossom';

const macro = (t, algorithm, edges, expected) => {
	const input = edges.map((edge) => edge.slice()); // Deepcopy
	const result = algorithm(edges);
	t.deepEqual(expected, result);
	t.deepEqual(input, edges);
};

macro.title = (title, algorithm, edges, expected) =>
	title ||
	`${algorithm.name}(${JSON.stringify(edges)}) = ${JSON.stringify(expected)}`;

const tests = {
	test14_maxcard: {
		edges: [
			[1, 2, 5],
			[2, 3, 11],
			[3, 4, 5]
		],
		expected: [-1, 2, 1, 4, 3]
	},

	test16_negative_maxCardinality: {
		edges: [
			[1, 2, 2],
			[1, 3, -2],
			[2, 3, 1],
			[2, 4, -1],
			[3, 4, -6]
		],
		expected: [-1, 3, 4, 1, 2]
	}
};

const btt = blossom(true, true);
const bdflt = blossom();

const algorithms = [
	maximumCardinalityMatching,
	(edges) => btt(edges, true),
	(edges) => bdflt(edges, true)
];

for (const [i, algorithm] of enumerate(algorithms))
	for (const [key, {edges, expected}] of Object.entries(tests))
		test(`${key} ${i}`, macro, algorithm, edges, expected);
