// exercise 1.12
function pascal_triangle(row, index) {
  if (row === index || index === 1) {
    return 1;
  } else if (index > row) {
    return false;
  } else {
    return (
      pascal_triangle(row - 1, index - 1) + pascal_triangle(row - 1, index)
    );
  }
}

console.log(pascal_triangle(5, 4));

// exercise 1.13

// SICP JS 1.2.6

//1.25

function square(x) {
  return x * x;
}

function smallest_divisor(n) {
  return find_divisor(n, 2);
}
function find_divisor(n, test_divisor) {
  return square(test_divisor) > n
    ? n
    : divides(test_divisor, n)
    ? test_divisor
    : find_divisor(n, next(test_divisor));
}
function divides(a, b) {
  return b % a === 0;
}

function is_prime(n) {
  return n === smallest_divisor(n);
}

function next(n) {
  return n === 2 ? 3 : n + 2;
}

//1.24
// SICP JS 1.2.6

function square(x) {
  return x * x;
}

function is_even(n) {
  return n % 2 === 0;
}

function fast_expt(b, n) {
  return n === 0
    ? 1
    : is_even(n)
    ? square(fast_expt(b, n / 2))
    : b * fast_expt(b, n - 1);
}

function expmod(base, exp, m) {
  return exp === 0
    ? 1
    : is_even(exp)
    ? square(expmod(base, exp / 2, m)) % m
    : (base * expmod(base, exp - 1, m)) % m;
}

function expmod(base, exp, m) {
  return fast_expt(base, exp) % m;
}

expmod(4, 3, 5);

// 1.27
// fermat test function

function fermat_test(n) {
  return is_congruent(1 + Math.floor(Math.random() * n - 1), n);
}

function is_congruent(a, n) {
  return a ** n % n === a % n ? true : false;
}

// 1.28 !!!

// 1.29

function inc(k) {
  return k + 1;
}

// function simpson_rule(f, a, b, n) {
//   function helper(h) {
//     function y(k) {
//       return f(k * h + a);
//     }

//     function term(k) {
//       return k === 0 || k === n ? y(k) : k % 2 === 0 ? 2 * y(k) : 4 * y(k);
//     }
//     return sum(term, 0, inc, n) * (h / 3);
//   }
//   return helper((b - a) / n);
// }

// function simpson_rule_integral(f, a, b, n) {
//     function find_f_k()
// }

// 1.3.1
function sum(term, a, next, b) {
  return a > b ? 0 : term(a) + sum(term, next(a), next, b);
}

function cube(x) {
  return x * x * x;
}

function integral(f, a, b, dx) {
  function add_dx(x) {
    return x + dx;
  }

  return sum(f, a + dx / 2, add_dx, b) * dx;
}

// 1.29
function simpson_rule(f, a, b, n) {
  function helper(k) {
    function y(k) {
      return f(a + k * h);
    }
    function term(k) {
      return k === 0 || k === n ? y(k) : k % 2 === 0 ? 2 * y(k) : 4 * y(k);
    }
    return sum(term, a, inc, n) * (h / 3);
  }
  return helper((b - a) / n);

  return;
}

// 1.30
function sum(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), result + term(a));
  }
  return iter(a, 0);
}

// 1.31
function product(term, a, next, b) {
  return a > b ? 1 : term(a) * product(term, next(a), next, b);
}

function factorial(a, b) {
  return product(term, a, dec, b);
}

function product_i(term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), result * term(a));
  }

  return iter(a, 1);
}

//1.32
function accumulate_r(combiner, null_value, term, a, next, b) {
  return a > b
    ? null_value
    : combiner(
        term(a),
        accumulate(combiner, null_value, term, next(a), next, b)
      );
}

function sum_r(term, a, next, b) {
  function plus(x, y) {
    return x + y;
  }
  return accumulate_r(plus, 0, term, a, next, b);
}

function accumulate_i(combiner, null_value, term, a, next, b) {
  function iter(a, result) {
    return a > b ? result : iter(next(a), combiner(term(a), result));
  }
  return iter(a, null_value);
}

function sum_i(term, a, next, b) {
  function next(n) {
    return n + 1;
  }

  function plus(x, y) {
    return x + y;
  }
  return accumulate_i(plus, 0, term, a, next, b);
}

// 1.33

function filtered_accumulate(combiner, null_value, term, a, next, b, filter) {
  return a > b
    ? null_value
    : filter(a)
    ? combiner(
        term(a),
        filtered_accumulate(
          combiner,
          null_value,
          term,
          next(a),
          next,
          b,
          filter
        )
      )
    : filtered_accumulate(combiner, null_value, term, next(a), next, b, filter);
}

function pi_sum(a, b) {
  return (
    sum(
      (x) => 1 / (x * (x + 2)),
      a,
      (x) => x + 4
    ),
    b
  );
}

// 1.34
function f(f) {
  return 2(2);
}

// error
// 1.35

function abs(x) {
  return x >= 0 ? x : -x;
}

const tolerance = 0.00001;

function fixed_point(f, first_guess) {
  let step = 0;
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }

  function try_with(guess) {
    const next = f(guess);
    step = step + 1;

    console.log(guess, "step " + step);
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

function fixed_point_with_damping(f, first_guess) {
  let step = 0;
  function close_enough(x, y) {
    return abs(x - y) < tolerance;
  }

  function try_with(guess) {
    const next = (f(guess) + guess) / 2;

    step = step + 1;

    console.log(guess, "step " + step);
    return close_enough(guess, next) ? next : try_with(next);
  }
  return try_with(first_guess);
}

console.log("golden ratio");
console.log(fixed_point((x) => 1 + 1 / x, 1));

// 1.36

console.log(fixed_point((x) => Math.log(1000) / Math.log(x), 1.5));
console.log(fixed_point_with_damping((x) => Math.log(1000) / Math.log(x), 1.5));
// damping has 12 steps, non damping has 36!

// 1.37
// recursive
function cont_frac(n, d, k) {
  function fraction(i) {
    return i > k ? 0 : n(i) / (d(i) + fraction(i + 1));
  }
  return fraction(1);
}

// iterative
function cont_frac_i(n, d, k) {
  function fraction(i, current) {
    return i === 0 ? current : fraction(i - 1, n(i) / (d(i) + current));
  }
  return fraction(k, 0);
}

console.log(
  cont_frac(
    (i) => 1,
    (i) => 1,
    15
  )
);

//1.38
cont_frac(
  (i) => 1,
  (i) => {
    (i + 1) % 3 === 0 ? 2 * (i + 1) : 1;
  },
  20
);

//1.39
function tan_cf(x, k) {
  return cont_frac(
    (i) => (i === 1 ? x : -x * x),
    (i) => i * 2 - 1,
    k
  );
}

// CHAPTER 1.3.4
function deriv(g) {
  return (x) => (g(x + dx) - g(x)) / dx;
}

const dx = 0.00001;

function newton_transform(g) {
  return (x) => x - g(x) / deriv(g)(x);
}

function newtons_method(g, guess) {
  return fixed_point(newton_transform(g), guess);
}

function sqrt(x) {
  return newtons_method((y) => square(y) - x, 1);
}

function fixed_point_of_transform(g, transform, guess) {
  return fixed_point(transform(g), guess);
}

function sqrt1(x) {
  return fixed_point_of_transform((y) => x / y, average_damp, 1);
}

function sqrt2(x) {
  return fixed_point_of_transform((y) => square(y) - x, newton_transform, 1);
}

//1.40
function cubic(a, b, c) {
  return (x) => cube(x) + a * square(x) + b * x + c;
}

//1.41
function double(f) {
  return (x) => f(f(x));
}

//1.42
function compose(f, g) {
  return (x) => f(g(x));
}

//1.43
function repeated(f, n) {
  return n > 0 ? (x) => x : compose(f, repeated(f, n - 1));
}

//1.44
function smooth(f) {
  return (x) => (f(x - dx) + f(x) + f(x + dx)) / 3;
}

function n_fold_smoothed_function(f, n) {
  return repeated(smooth, n)(f);
}

//1.45

//1.46
function iterative_improve(is_good_enough, improve) {
  function iterate(guess) {
    return is_good_enough(guess) ? guess : iterate(improve(guess));
  }
  return iterate;
}

//2.1 better version of make_rat

function sign(x) {
  return x < 0 ? -1 : x > 0 ? 1 : 0;
}

function make_rat(n, d) {
  const g = gcd(n, d);
  return pair(sign(n) * sign(d) * abs(n / g), abs(d / g));
}

//2.2
function make_point(x, y) {
  return pair(x, y);
}

function x_point(c) {
  return head(c);
}

function y_point(c) {
  return tail(c);
}

function make_segment(start_point, end_point) {
  return pair(start_point, end_point);
}

function start_segment(x) {
  return head(x);
}

function end_segment(x) {
  return tail(x);
}

function average(a, b) {
  return (a + b) / 2;
}

function midpoint_segment(x) {
  const a = start_segment(x);
  const b = end_segment(x);
  return pair(average(x_point(a), x_point(b)), average(y_point(a), y_point(b)));
}

//2.3
function rectangle1(lower_left, upper_right) {
  return make_segment(lower_left, upper_right);
}

function rectangle2(lower_left, height, width) {
  const upper_right = pair(head(lower_left) + width, tail(lower_left) + height);
  return make_segment(lower_left, upper_right);
}

function perimeter(rectangle) {
  return (
    2 * (x_point(end_segment(rectangle)) - x_point(start_segment(rectangle))) +
    (y_point(end_segment(rectangle)) - y_point(start_segment(rectangle)))
  );
}

function area(rectangle) {
  return (
    (x_point(end_segment(rectangle)) - x_point(start_segment(rectangle))) *
    (y_point(end_segment(rectangle)) - y_point(start_segment(rectangle)))
  );
}

// implementation of pair, head and tail
function pair(x, y) {
  function dispatch(m) {
    return m === 0 ? x : m === 1 ? y : error(m, "argument not 0 or 1 -- pair");
  }
  return dispatch;
}

function head(z) {
  return z(0);
}

function tail(z) {
  return z(1);
}

const x = pair(1, 2);
head(x);

// 2.4
function tail(z) {
  return z((p, q) => q);
}

// 2.5
function pair(a, b) {
  return fast_expt(2, a) * fast_expt(3, b);
}

function head(p) {
  return p % 2 === 0 ? head(p / 2) + 1 : 0;
}

function tail(p) {
  return p % 3 === 0 ? tail(p / 3) + 1 : 0;
}

//2.6 Church literals

const zero = (f) => (x) => x;

console.log("zero", zero);

function add_1(n) {
  return (f) => (x) => f(n(f)(x));
}

const one = (f) => (x) => f(x);
const two = (f) => (x) => f(f(x));

function add(m, n) {
  return (f) => (x) => m(f(n(f(x))));
}

function church_to_number(c) {
  return c((n) => n + 1)(0);
}

//2.7
function make_interval(x, y) {
  return pair(x, y);
}

function upper_bound(x) {
  return head(x);
}

function lower_bound(x) {
  return tail(x);
}

//2.8
function sub_interval(x, y) {
  return make_interval(
    lower_bound(x) - upper_bound(y),
    upper_bound(x) - lower_bound(y)
  );
}

//2.10
function mul_interval(x, y) {
  const p1 = lower_bound(x) * lower_bound(y);
  const p2 = lower_bound(x) * upper_bound(y);
  const p3 = upper_bound(x) * lower_bound(y);
  const p4 = upper_bound(x) * upper_bound(y);
  return make_interval(math_min(p1, p2, p3, p4), math_max(p1, p2, p3, p4));
}

function div_interval(x, y) {
  return mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}

function div_interval_span_zero(x, y) {
  return lower_bound(y) <= 0 && upper_bound(y) >= 0
    ? error("division error (interval spans 0)")
    : mul_interval(x, make_interval(1 / upper_bound(y), 1 / lower_bound(y)));
}

//2.11 too many use cases :'(
function mul_interval_endpoints(x, y) {
  const xl = lower_bound(x);
  const xu = upper_bound(x);
  const yl = lower_bound(y);
  const yu = upper_bound(y);
  return p(xl) && p(xu) && p(yl) && p(yu)
    ? make_interval(xl * yl, xu * yu)
    : p(xl) && p(xu) && n(yl) && p(yu)
    ? make_interval(xu * yl, xu * yu)
    : p(xl) && p(xu) && n(yl) && n(yu)
    ? make_interval(xu * yl, xl * yu)
    : n(xl) && p(xu) && p(yl) && p(yu)
    ? make_interval(xl * yu, xu * yu)
    : n(xl) && p(xu) && n(yl) && n(yu)
    ? make_interval(xu * yl, xl * yl)
    : n(xl) && n(xu) && p(yl) && p(yu)
    ? make_interval(xl * yu, xu * yl)
    : n(xl) && n(xu) && n(yl) && p(yu)
    ? make_interval(xl * yu, xl * yl)
    : n(xl) && n(xu) && n(yl) && n(yu)
    ? make_interval(xu * yu, xl * yl)
    : n(xl) && p(xu) && n(yl) && p(yu)
    ? the_trouble_maker(xl, xu, yl, yu)
    : error("lower larger than upper");
}

//2.12
// function make_center_percent(c, t) {
//   return make_interval(c * 1 - p, c * 1 + p);
// }

function center(i) {
  return (lower_bound(i) + upper_bound(i)) / 2;
}

// function percent(i) {
//   return ((upper_bound(i) - lower_bound(i)) / 2 / center) * 100;
// }

// 2.12 answer
function make_center_percent(center, percent) {
  const width = center * (percent / 100);
  return make_center_width(center, width);
}

function percent(i) {
  return (width(i) / center(i)) * 100;
}

// 2.14

// 2.2.1
function list_ref(items, n) {
  return n === 0 ? head(items) : list_ref(tail(items), n - 1);
}

//recursively
function length(items) {
  return is_null(items) ? 0 : 1 + length(tail(items));
}

//iteratively
function length(items) {
  function length_iter(a, count) {
    return is_null(a) ? count : length_iter(tail(a), count + 1);
  }
  return length_iter(items, 0);
}

function append(list1, list2) {
  return is_null(list1) ? list2 : pair(head(list1), append(tail(list1), list2));
}

//2.17 last_pair
function last_pair(items) {
  return is_null(tail(items)) ? items : last_pair(tail(items));
}

//2.18
function naive_reverse(items) {
  return is_null(items)
    ? null
    : append(reverse(tail(items)), pair(head(items), null));
}

function reverse(items) {
  function reverse_iter(items, result) {
    return is_null(items)
      ? result
      : reverse_iter(tail(items), pair(head(items), result));
  }
  return reverse_iter(items, null);
}

// exercise 2.19 change counting for different currency

// 2.20 currying
function plus_curried(x) {
  return (y) => x + y;
}

function brooks(f, items) {
  return is_null(items) ? f : brooks(f(head(items), tail(items)));
}

function brooks_curried(items) {
  return brooks(head(items), tail(items));
}

// map over list
function scale_list(items, factor) {
  return is_null(items)
    ? null
    : pair(head(items) * factor, scale_list(tail(items), factor));
}

function map(fun, items) {
  return is_null(items) ? null : pair(fun(head(items)), map(fun, tail(items)));
}

function scale_list_map(items, factor) {
  return map((x) => x * factor, items);
}

//2.21
function square_list(items) {
  return is_null(items)
    ? null
    : pair(head(items) * head(items), square_list(tail(items)));
}

function square_list_map(items) {
  return map((x) => x * x, items);
}

// or replace x*x with the function square
function for_each(f, items) {
  if (is_null(items)) {
    return undefined;
  } else {
    f(head(items));
    for_each(f, tail(items));
  }
}

//2.25
// head(tail(head(tail(tail(the_first_list)))));
// head(head(the_second_list));
// head(tail(head(tail(head(tail(head(tail(head(tail(head(tail(the_third_list))))))))))));

//2.27
// function reverse(items) {
//   function reverse_iter(items, result) {
//     return is_null(items)
//       ? result
//       : reverse_iter(tail(items), pair(head(items), result));
//   }
//   return reverse_iter(items, null);
// }

function deep_reverse(items) {
  return is_null(items)
    ? null
    : is_pair(items)
    ? append(deep_reverse(tail(items)), pair(deep_reverse(head(items)), null))
    : items;
}

//2.28
function fringe(items) {
  return is_null(items)
    ? null
    : is_pair(items)
    ? append(fringe(head(x)), fringe(tail(x)))
    : list(items);
}

//2.29
function make_mobile(left, right) {
  return list(left, right);
}

function make_branch(length, structure) {
  return list(length, structure);
}

function left_branch(mobile) {
  return head(mobile);
}

function right_branch(mobile) {
  return head(tail(mobile));
}

function branch_length(branch) {
  return head(branch);
}

function branch_structure(branch) {
  return head(tail(branch));
}

function is_weight(item) {
  return is_number(item);
}

function total_weight(items) {
  return is_weight(items)
    ? items
    : total_weight(branch_structure(left_branch(items))) +
        total_weight(branch_structure(right_branch(items)));
}

// is_balanced to-do

function scale_tree(tree, factor) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? tree * factor
    : pair(scale_tree(head(tree), factor), scale_tree(tail(tree), factor));
}

function scale_tree_map(tree, factor) {
  return map(
    (sub_tree) =>
      is_pair(sub_tree) ? scale_tree(sub_tree, factor) : sub_tree * factor,
    tree
  );
}

// 2.30
function square_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? tree * tree
    : pair(square_tree(head(tree)), square_tree(tail(tree)));
}

function square_tree_map(tree) {
  return map(
    (sub_tree) =>
      is_pair(sub_tree) ? square_tree_map(sub_tree) : sub_tree * sub_tree,
    tree
  );
}

//2.31
function tree_map(f, tree) {
  return map(
    (sub_tree) =>
      is_null(sub_tree)
        ? null
        : is_pair(sub_tree)
        ? tree_map(sub_tree)
        : f(sub_tree),
    tree
  );
}

// 2.32

function filter(predicate, sequence) {
  return is_null(sequence)
    ? null
    : predicate(head(sequence))
    ? pair(head(sequence), filter(predicate, tail(sequence)))
    : filter(predicate, tail(sequence));
}

function accumulate(op, initial, sequence) {
  return is_null(sequence)
    ? initial
    : op(head(sequence), accumulate(op, initial, tail(sequence)));
}

function enumerate_interval(low, high) {
  return low > high ? null : pair(low, enumerate_interval(low + 1, high));
}

function enumerate_tree(tree) {
  return is_null(tree)
    ? null
    : !is_pair(tree)
    ? list(tree)
    : append(enumerate_tree(head(tree)), enumerate_tree(tail(tree)));
}

function sum_odd_squares(tree) {
  return accumulate(plus, 0, map(square, filter(is_odd, enumerate_tree(tree))));
}

function even_fibs(n) {
  return accumulate(
    pair,
    null,
    filter(is_even, map(fib, enumerate_interval(0, n)))
  );
}

//2.33
function map1(f, sequence) {
  return accumulate((x, y) => pair(f(x), y), null, sequence);
}
// y index
function append(seq1, seq2) {
  return accumulate(pair, seq2, seq1);
}

function length(sequence) {
  return accumulate((x, y) => y + 1, 0, sequence);
}

//2.34
function horner_eval(x, coefficient_sequence) {
  return accumulate(
    (this_coeff, higher_terms) => {
      this_coeff + higher_terms * x;
    },
    0,
    coefficient_sequence
  );
}

//2.35
function count_leaves_redine(t) {
  return accumulate(
    (leaves, total) => leaves + total,
    0,
    map(
      (sub_tree) => (is_pair(sub_tree) ? count_leaves_redine(sub_tree) : 1, t)
    )
  );
}

//2.36
function accumulate_n(op, init, seqs) {
  return is_null(head(seqs))
    ? null
    : pair(
        accumulate(
          op,
          init,
          map((x) => head(x), seqs),
          accumulate_n(
            op,
            init,
            map((x) => tail(x), seqs)
          )
        )
      );
}

//2.37
function dot_product(v, w) {
  return accumulate(plus, 0, accumulate_n(times, 1, list(v, w)));
}

function matrix_times_vector(m, v) {
  return map((row) => dot_product(row, v), m);
}

function transpose(mat) {
  return accumulate_n(pair, null, mat);
}

function matrix_times_matrix(n, m) {
  const cols = transpose(n);
  return map((x) => map((y) => dot_product(x, y), cols), n);
}

//2.38
function fold_left(op, initial, sequence) {
  function iter(result, rest) {
    return is_null(rest) ? result : iter(op(result, head(rest)), tail(rest));
  }
  return iter(initial, sequence);
}

//2.39
function reverse_fold_right(sequence) {
  return fold_right((x, y) => append(y, list(x)), null, sequence);
}

function reverse_fold_left(sequence) {
  return fold_left((x, y) => pair(y, x), null, sequence);
}

//2.40
function unique_pairs(n) {
  return flatmap(
    (i) => map((j) => list(i, j), enumerate_interval(1, i - 1)),
    enumerate_interval(1, n)
  );
}

function prime_sum_pairs(n) {
  return map(make_pair_sum, filter(is_prime_sum), unique_pairs(n));
}

// 2.41
function ordered_triples_distinct(n, s) {
  return map(
    make_triple,
    filter(
      (x) => x === s,
      flatmap((i) =>
        map(
          (j) =>
            map(
              (k) => list(i, j, k),
              enumerate_interval(1, i - 2),
              enumerate_interval(1, i - 1)
            ),
          enumerate_interval(1, n)
        )
      )
    )
  );
}

function unique_triples(n) {
  return flatmap(
    (i) =>
      flatmap(
        (j) => map((k) => list(i, j, k), enumerate_interval(1, j - 1)),
        enumerate_interval(1, i - 1)
      ),
    enumerate_interval(1, n)
  );
}
function plus(x, y) {
  return x + y;
}
function triples_that_sum_to(s, n) {
  return filter((items) => accumulate(plus, 0, items) === s, unique_triples(n));
}

// 2.42

// 2.43

// 2.44
function right_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const smaller = right_split(painter, n - 1);
    return beside(painter, stack(smaller, smaller));
  }
}

function up_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const smaller = up_split(painter, n - 1);
    return stack(painter, beside(smaller, smaller));
  }
}

function corner_split(painter, n) {
  if (n === 0) {
    return painter;
  } else {
    const up = up_split(painter, n - 1);
    const right = right_split(painter, n - 1);
    const left_half = below(up, painter);
    const right_half = below(painter, right);
    return beside(left_half, right_half);
  }
}

// 2.45

function split(bigger_op, smaller_op) {
  function rec_split(painter, n) {
    if (n === 0) {
      return painter;
    } else {
      const smaller = rec_split(painter, n - 1);
      return bigger_op(painter, smaller_op(smaller, smaller));
    }
  }
  return rec_split;
}

function frame_coord_map(frame) {
  return (v) =>
    add_vect(
      origin_frame(frame),
      add_vect(
        scale_vect(xcor_vect(v), edge1_frame(frame)),
        scale_vect(ycor_vect(v), edge2_frame(frame))
      )
    );
}

//2.46
function make_vect(x, y) {
  return pair(x, y);
}

function xcor(vector) {
  return head(vector);
}
function ycor(vector) {
  return tail(vector);
}

function add_vector(v1, v2) {
  return make_vector(xcor(v1) + xcor(v2), ycor(v1) + ycor(v2));
}

function scale_vect(factor, vector) {
  return make_vect(factor * xcor(vector), factor * ycor(vector));
}

function sub_vector(v1, v2) {
  return make_vector(xcor(v1) - xcor(v2), ycor(v1) - ycor(v2));
}

// 2.47
function make_frame(origin, edge1, edge2) {
  return list(origin, edge1, edge2);
}

function origin_frame(frame) {
  return list_ref(frame, 0);
}
function edge1_frame(frame) {
  return list_ref(frame, 1);
}
function edge2_frame(frame) {
  return list_ref(frame, 2);
}

function make_frame1(origin, edge1, edge2) {
  return pair(origin, pair(edge1, edge2));
}

function origin_frame1(frame) {
  return head(frame);
}
function edge1_frame(frame) {
  return head(tail(frame));
}
function edge2_frame(frame) {
  return tail(tail(frame));
}

// 2,48
function make_segment(v1, v2) {
  return pair(v1, v2);
}

function start_segment(v) {
  return head(v);
}

function end_segment(v) {
  return tail(v);
}

// 2.49
function segments_to_painter(segment_list) {
  return (frame) =>
    for_each(
      (segment) =>
        draw_line(
          frame_coord_map(frame)(start_segment(segment)),
          frame_coord_map(frame)(end_segment(segment))
        ),
      segment_list
    );
}

//1. draws the outline
// basically coordinates
const outline_start_1 = make_vect(0, 0);
const outline_end_1 = make_vect(1, 0);
const outline_segment_1 = make_segment(outline_start_1, outline_end_1);
const outline_start_2 = make_vect(1, 0);
const outline_end_2 = make_vect(1, 1);
const outline_segment_2 = make_segment(outline_start_2, outline_end_2);
const outline_start_3 = make_vect(1, 1);
const outline_end_3 = make_vect(0, 1);
const outline_segment_3 = make_segment(outline_start_3, outline_end_3);
const outline_start_4 = make_vect(0, 1);
const outline_end_4 = make_vect(0, 0);
const outline_segment_4 = make_segment(outline_start_4, outline_end_4);
const outline_painter = segments_to_painter(
  list(
    outline_segment_1,
    outline_segment_2,
    outline_segment_3,
    outline_segment_4
  )
);

function transform_painter(painter, origin, corner1, corner2) {
  return (frame) => {
    const m = frame_coord_map(frame);
    const new_origin = m(origin);
    return painter(
      make_frame(
        new_origin,
        sub_vect(m(corner1), new_origin),
        sub_vect(m(corner2), new_origin)
      )
    );
  };
}

//2.50
function flip_horiz(painter) {
  return transform_painter(
    painter,
    make_vect(1, 0),
    make_vect(0, 0),
    make_vect(1, 1)
  );
}

function rotate180(painter) {
  return transform_painter(
    painter,
    make_vect(1, 1),
    make_vect(0, 1),
    make_vect(1, 0)
  );
}

function rotate270(painter) {
  return transform_painter(
    painter,
    make_vect(0, 1),
    make_vect(0, 0),
    make_vect(1, 1)
  );
}

//2.51
function below(painter1, painter2) {
  const split_point = make_vect(0, 0.5);
  const paint_upper = transform_painter(
    painter1,
    split_point,
    make_vect(1, 0.5),
    make_vect(0, 1)
  );

  const paint_lower = transform_painter(
    painter2,
    make_vect(0, 1),
    make_vect(1, 0),
    split_point
  );

  return (frame) => {
    paint_upper(frame), paint_lower(frame);
  };
}

// 2.52

//2.54
function equal(xs, ys) {
  return is_pair(xs)
    ? is_pair(ys) && equal(head(xs), head(ys)) && equal(tail(xs), tail(ys))
    : is_null(xs)
    ? is_null(ys)
    : is_number(xs)
    ? is_number(ys) && xs === ys
    : is_boolean(xs)
    ? is_boolean(ys) && ((xs && ys) || (!xs && !ys))
    : is_string(xs)
    ? is_string(ys) && xs === ys
    : is_undefined(xs)
    ? is_undefined(ys)
    : is_function(ys) && xs === ys;
}

function equal(xs, ys) {
  return is_pair(xs)
    ? is_pair(ys) && equal(head(xs), head(ys)) && equal(tail(xs), tail(ys))
    : xs === ys;
}

// 2.55
// false

function deriv(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : is_sum(exp)
    ? make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable))
    : is_product(exp)
    ? make_sum(
        make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
        make_product(deriv(multiplier(exp), variable), multiplicand(exp))
      )
    : error(exp, "unknown expression type -- deriv");
}

//2.56
function base(e) {
  return head(tail(e));
}
function exponent(e) {
  return head(tail(tail(e)));
}
function make_exp(base, exp) {
  return number_equal(exp, 0)
    ? 1
    : number_equal(exp, 1)
    ? base
    : list("**", base, exp);
}
function is_exp(x) {
  return is_pair(x) && head(x) === "**";
}
function deriv(exp, variable) {
  return is_number(exp)
    ? 0
    : is_variable(exp)
    ? is_same_variable(exp, variable)
      ? 1
      : 0
    : is_sum(exp)
    ? make_sum(deriv(addend(exp), variable), deriv(augend(exp), variable))
    : is_product(exp)
    ? make_sum(
        make_product(multiplier(exp), deriv(multiplicand(exp), variable)),
        make_product(deriv(multiplier(exp), variable), multiplicand(exp))
      )
    : is_exp(exp)
    ? make_product(
        make_product(exponent(exp), make_exp(base(exp), exponent(exp) - 1)),
        deriv(base(exp), variable)
      )
    : error(exp, "unknown expression type -- deriv");
}

// 2.57, 2.58

//2.59
function adjoin_set(x, set) {
  return is_element_of_set(x, set) ? set : pair(x, set);
}

function union_set(set1, set2) {
  return is_null(set1)
    ? set2
    : adjoin_set(head(set1), union_set(tail(set1), set2));
}

// sets as ordered lists

//sets as tree

function entry(tree) {
  return head(tree);
}

function left_branch(tree) {
  return head(tail(tree));
}

function right_branch(tree) {
  return head(tail(tail(tree)));
}

function make_tree(entry, left, right) {
  return list(entry, left, right);
}

function is_element_of_set(x, set) {
  return is_null(set)
    ? false
    : x === entry(set)
    ? true
    : x < entry(set)
    ? is_element_of_set(x, left_branch(set))
    : //
      x > entry(set);
  x > entry(set);
  is_element_of_set(x, right_branch(set));
}

function adjoin_set(x, set) {
  return is_null(set)
    ? make_tree(x, null, null)
    : x === entry(set)
    ? set
    : x < entry(set)
    ? make_tree(entry(set), adjoin_set(x, left_branch(set)), right_branch(set))
    : //
      x > entry(set);
  x > entry(set);
  make_tree(entry(set), left_branch(set), adjoin_set(x, right_branch(set)));
}

//2.62
function union_set(set1, set2) {
  if (is_null(set1)) {
    return set2;
  } else if (is_null(set2)) {
    return set1;
  } else {
    const x1 = head(set1);
    const x2 = head(set2);
    return x1 === x2
      ? pair(x1, union_set(tail(set1), tail(set2)))
      : x1 < x2
      ? pair(x1, union_set(tail(set1), set2))
      : pair(x2, union_set(set1, tail(set2)));
  }
}
//.... -> 2.66 , 2.3.3

// 2.66
function lookup(given_key, tree_of_records) {
  if (is_null(tree_of_records)) {
    return null;
  } else {
    const this_entry = entry(tree_of_records);
    const this_key = key(this_entry);
    return given_key === this_key
      ? this_entry
      : given_key < this_key
      ? lookup(given_key, left_branch(tree_of_records))
      : lookup(given_key, right_branch(tree_of_records));
  }
}
