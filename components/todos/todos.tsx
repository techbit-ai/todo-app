import { createClient } from "@/utils/supabase/server";
import Todo from "./todo";
import AddTodo from "./add-todo";

export default async function Todos() {
  const supabase = await createClient(); // ✅ FIXED: add await

  const { data: todos, error } = await supabase.from("todos").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex flex-col">
        {todos &&
          todos
            .filter((todo) => !todo.is_complete)
            .map((todo) => <Todo key={todo.id} todo={todo} />)}

        {todos &&
          todos
            .filter((todo) => todo.is_complete)
            .map((todo) => <Todo key={todo.id} todo={todo} />)}

        <AddTodo />
      </div>
    </div>
  );
}
