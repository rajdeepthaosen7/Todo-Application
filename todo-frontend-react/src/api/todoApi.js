const API_BASE_URL = 'http://localhost:8080';

const defaultFetchOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors', // Explicitly set CORS mode
};

// Debug: Log backend connectivity
console.log('📡 API Base URL:', API_BASE_URL);
console.log('🔗 Frontend Origin:', window.location.origin);

export async function fetchTodos({ page = 0, size = 10, sort = 'createdAt,desc' } = {}) {
  try {
    console.log(`🔄 Fetching todos from: ${API_BASE_URL}/todos`);
    const res = await fetch(`${API_BASE_URL}/todos?page=${page}&size=${size}&sort=${sort}`, {
      ...defaultFetchOptions,
      method: 'GET',
    });
    if (!res.ok) {
      const errorData = await res.text();
      console.error(`❌ API Error (${res.status}):`, errorData);
      console.error('📋 Response Headers:', Object.fromEntries(res.headers));
      throw new Error(`Failed to load todos: ${res.status} ${res.statusText}`);
    }
    console.log('✅ Todos loaded successfully');
    return res.json();
  } catch (error) {
    console.error('🚨 fetchTodos error:', error.message);
    if (error.message.includes('Failed to fetch')) {
      console.error('💡 Possible causes: CORS issue, backend not running, or network blocked');
    }
    throw error;
  }
}

export async function createTodo({ title, description, dueDate }) {
  const body = {
    title,
    description: description || null,
    dueDate: dueDate || null,
  };

  try {
    const res = await fetch(`${API_BASE_URL}/todos`, {
      ...defaultFetchOptions,
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error(`API Error (${res.status}):`, errorData);
      throw new Error(`Failed to create todo: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('createTodo error:', error);
    throw error;
  }
}

export async function patchTodo(id, payload) {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      ...defaultFetchOptions,
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error(`API Error (${res.status}):`, errorData);
      throw new Error(`Failed to update todo: ${res.status} ${res.statusText}`);
    }
    return res.json();
  } catch (error) {
    console.error('patchTodo error:', error);
    throw error;
  }
}

export async function deleteTodoApi(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
      ...defaultFetchOptions,
      method: 'DELETE',
    });
    if (!(res.status === 204 || res.ok)) {
      const errorData = await res.text();
      console.error(`API Error (${res.status}):`, errorData);
      throw new Error(`Failed to delete todo: ${res.status} ${res.statusText}`);
    }
  } catch (error) {
    console.error('deleteTodoApi error:', error);
    throw error;
  }
}
