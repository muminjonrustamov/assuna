import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Storage

export const uploadImage = async (file) => {
  if (!file) throw new Error("Файл не предоставлен");

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;

  const { error } = await supabase.storage
    .from('products')
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from('products').getPublicUrl(fileName);
  return data.publicUrl;
};

// Products

export const getProducts = async () => {
  const { data, error } = await supabase.from('Products').select('*');
  if (error) throw error;
  return data;
};

export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('Products')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const createProduct = async (product) => {
  const { data, error } = await supabase
    .from('Products')
    .insert([product])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateProduct = async (id, product) => {
  const { data, error } = await supabase
    .from('Products')
    .update(product)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteProduct = async (id) => {
  const { error } = await supabase.from('Products').delete().eq('id', id);
  if (error) throw error;
  return { message: '✅ Product deleted successfully' };
};

// Category

export const getCategories = async () => {
  const { data, error } = await supabase.from('Category').select('*');
  if (error) throw error;
  return data;
};

export const getCategoryById = async (id) => {
  const { data, error } = await supabase
    .from('Category')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const createCategory = async (category) => {
  const { data, error } = await supabase
    .from('Category')
    .insert([category])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateCategory = async (id, category) => {
  const { data, error } = await supabase
    .from('Category')
    .update(category)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteCategory = async (id) => {
  const { error } = await supabase.from('Category').delete().eq('id', id);
  if (error) throw error;
  return { message: '✅ Category deleted successfully' };
};