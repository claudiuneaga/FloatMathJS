var FloatMathJS = {

    ADD_ERROR: 'add: Both operands must be numbers.',

    ROUND_ERROR: 'roundToDecimals: The specified value is not a number.',

    VALID_ARRAY: 'arraySum: First parameter must be an Array.',

    VALID_NUMBER: 'arraySum: All array items must be numbers.',

    /**
     * Adds two numerical values and rounds them to the specified number of
     * decimals.
     * 
     * @param  {number} a   The first value of the operation.
     * @param  {number} b   The second value of the operation.
     * @param  {number} decimals    The number of decimals to use for the result
     *                            (default is 2).
     * @return {number} The result of the add operation, with the specified
     *                    number of decimals.
     */
    add: function (a, b, decimals) {
        'use strict';

        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error(this.ADD_ERROR);
        }

        decimals = this.makeSafeInteger(decimals, 1, 2);

        return this.roundToDecimals(a + b, decimals);
    },

    /**
     * Calculates the sum of all the items of a specified array. Note: all the
     * items of the array must be numbers, otherwise the function throws an
     * error message.
     * 
     * @param  {Array} arr    An array of numbers.
     * @param  {number} decimals    The number of decimals that the result will
     *                              be rounded to.
     * @return {number}       The sum of all the numbers of the array, rounded
     *                        to the specified number of decimals.
     */
    arraySum: function (arr, decimals) {
        'use strict';
        if (typeof arr !== 'object' || typeof arr.length !== 'number') {
            throw new Error(this.VALID_ARRAY);
        }

        if (!checkIfAllNumbers(arr)) {
            throw new Error(this.VALID_NUMBER);
        }

        var self = this,
            sum = 0;

        decimals = this.makeSafeInteger(decimals, 1, 2);

        arr.reduce(function(previousValue, currentValue) {
            return self.add(previousValue, currentValue, decimals);
        });

        return sum;
    },

    /**
     * Checks if all the items of a specified array are numeric values.
     * 
     * @param  {Array} arr  The array that will be checked for numerical items.
     * @return {boolean}    Returns true if all the items of the array are
     *                      numbers.
     */
    checkIfAllNumbers: function(arr) {
        'use strict';
        if (arr && arr.length && arr.every) {
            return arr.every(this.isNumber);
        }
        return false;
    },

    /**
     * Checks if a given value is of type number.
     * 
     * @param  {*} value    The value that will be checked if it is a numerical
     *                      value.
     * @return {boolean}    Returns true if the specified value is of type
     *                      number.
     */
    isNumber: function (value) {
        'use strict';
        return typeof value === 'number';
    },

    /**
     * Round a numerical value passed as parameter to a specified number of
     * decimals.
     * 
     * @param  {number} value   The numerical value that will be rounded.
     * @param  {number} decimals    The number of decimals value will be rounded
     *                            to.
     * @return {number}  A number value representing the value parameter
     *                    rounded to the specified number of decimals.
     */
    roundToDecimals: function (value, decimals) {
        'use strict';

        if (typeof value !== 'number') {
            throw new Error(this.ROUND_ERROR);
        }

        var decimalMultiplier = Math.pow(10, decimals);
        decimals = this.makeSafeInteger(decimals, 1, 2);
        value = value * decimalMultiplier;

        return Math.round(value) / decimalMultiplier;
    },

    /**
     * Creates an integer value from a given number value. If the passed number
     * is lower than the specified minimum value, a default integer will be
     * returned.
     *
     * @param  {number} n   The number that will be returnes as integer.
     * @param  {number} minValue    The minimum value n must have to be returned
     *                            as integer.
     * @param  {number} defaultV    A default number to be returned if n does
     *                            not correspond (either is not a number or
     *                            the value is less than the specified min).
     * @return {number}  An integer value of the specified numebr (n) or
     *                    the default value (defaultV) if n is not a number or
     *                    is less than minValue.
     */
    makeSafeInteger: function (n, minValue, defaultV) {
        'use strict';
        return (typeof n === 'number' && n > minValue) ?
                Math.round(n) : defaultV;
    }

};