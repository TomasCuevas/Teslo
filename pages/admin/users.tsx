import { useEffect, useState } from "react";
import { NextPage } from "next";
import useSWR from "swr";
import { MenuItem, Select } from "@mui/material";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* icons *//
import { PeopleOutline } from "@mui/icons-material";

//* layout *//
import { AdminLayout, LoadingLayout } from "../../components/layouts";

//* hooks *//
import { useAdmin } from "../../hooks";

//* api *//
import tesloApi from "../../axios/tesloApi";

//* interfaces *//
import { IUser } from "../../interfaces/user";

const UsersPage: NextPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const { isAdmin } = useAdmin({ query: "/admin/users" });

  const { data } = useSWR<IUser[]>("/api/admin/users");

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await tesloApi.put("/admin/users", { userId, newRole });
    } catch (error) {
      setUsers(previousUsers);
      console.log(error);
      alert("No se pudo actualizar el role del usuario.");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "User ID",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Nombre completo",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Rol",
      width: 300,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            sx={{ width: "300px", padding: 0 }}
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  if (isAdmin) {
    return (
      <AdminLayout
        title="Usuarios"
        subtitle="Mantenimiento de usuarios"
        icon={<PeopleOutline />}
        pageDescription="Pagina de mantenimiento de usuarios para administradores"
      >
        <div className="mt-2 animate-fadeIn">
          <div className="h-[650px]">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </div>
        </div>
      </AdminLayout>
    );
  }

  return <LoadingLayout title="Cargando" />;
};

export default UsersPage;
