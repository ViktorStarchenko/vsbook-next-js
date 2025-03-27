export function validateField(value, rules) {
    const trimmedValue = value?.trim() || "";

    for (const rule of rules) {
        if (rule.type === "required" && !trimmedValue) {
            return rule.message || "This field is required.";
        }
        if (rule.type === "minLength" && trimmedValue.length < rule.value) {
            return rule.message || `Minimum ${rule.value} characters required.`;
        }
        if (rule.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
            return rule.message || "Invalid email format.";
        }
        if (rule.type === "regex" && !rule.value.test(trimmedValue)) {
            return rule.message || "Invalid format.";
        }
    }

    return null; // Якщо помилок немає
}

export function validateFieldClient(value, rules) {
    const trimmedValue = value?.trim() || "";

    for (const rule of rules) {
        if (rule.type === "required" && !trimmedValue) {
            return rule.message || "This field is required.";
        }
        if (rule.type === "minLength" && trimmedValue.length < rule.value) {
            return rule.message || `Minimum ${rule.value} characters required.`;
        }
        if (rule.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
            return rule.message || "Invalid email format.";
        }
        if (rule.type === "regex" && !rule.value.test(trimmedValue)) {
            return rule.message || "Invalid format.";
        }
    }

    return null; // Якщо помилок немає
}


export function validateForm(fields, rules) {
    let errors = {};

    for (const field in rules) {
        const error = validateField(fields[field], rules[field]);
        if (error) {
            errors[field] = error;
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;
}


