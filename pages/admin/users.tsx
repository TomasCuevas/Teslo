import { NextPage } from "next";
import useSWRInmutable from "swr/immutable";
import { MenuItem, Select } from "@mui/material";

import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

//* icons *//
import { PeopleOutline } from "@mui/icons-material";

//* components *//
import { FullScreenLoading } from "../../components";

//* layout *//
import { AdminLayout } from "../../components/layouts";

//* hooks *//
import { useAdmin } from "../../hooks";

//* api *//
import tesloApi from "../../axios/tesloApi";

//* interfaces *//
import { IUser } from "../../interfaces/user";

const UsersPage: NextPage = () => {
  const { isAdmin } = useAdmin("/", "/admin/users");

  const { data: users = [] } = useSWRInmutable<IUser[]>("/api/admin/users", {
    refreshInterval: 1000 * 30,
  });

  const onRoleUpdated = async (userId: string, newRole: string) => {
    try {
      await tesloApi.put("/admin/users", { userId, newRole });
    } catch (error) {
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
    id: (user as any)._id,
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

  return (
    <AdminLayout
      title="Usuarios"
      subtitle="Mantenimiento de usuarios"
      icon={<PeopleOutline />}
      pageDescription="Pagina de mantenimiento de usuarios para administradores"
    >
      <FullScreenLoading />
    </AdminLayout>
  );
};

export default UsersPage;
