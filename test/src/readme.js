import test from 'ava';

import maximumMatching, {iter} from '../../src/index.js';
import maximumCardinalityMatching from '../../src/cardinality/index.js';

test('weight', (t) => {
	const edges = [
		[1, 2, 10],
		[2, 3, 11],
	];
	const matching = maximumMatching(edges); // [-1, -1, 3, 2]
	t.deepEqual(matching, [-1, -1, 3, 2]);
	t.deepEqual([...iter(matching)], [[2, 3]]);
});

test('cardinality', (t) => {
	const edges = [
		[1, 2],
		[2, 3],
		[3, 4],
	];
	const result = [...iter(maximumCardinalityMatching(edges))];
	t.deepEqual(result, [
		[1, 2],
		[3, 4],
	]);
});
