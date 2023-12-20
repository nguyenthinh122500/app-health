import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useDispatch, useSelector } from "react-redux";
import { storage_bucket } from "./../../firebase";
import { useFormik } from "formik";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  CreateDailyAction,
  CreateWorkoutAction,
  DeleteDailyAction,
  DeleteWorkoutAction,
  GetListWorkoutAction,
  SearchWorkoutAction,
  UpdateWorkoutAction,
  WorkoutDeleteExercisesAction,
  WorkoutDeleteMealAction,
} from "../../redux/action/WorkoutAction";
import { GetListMealAction } from "../../redux/action/MealAction";
import { GetListExercisesAction } from "../../redux/action/ExercisesAcrion";

export default function PlanWorkout() {
  const dispatch = useDispatch();
  const { arrWorkout } = useSelector((root) => root.WorkoutReducer);
  const { arrMeal } = useSelector((root) => root.MealReducer);
  const { arrExercises } = useSelector((root) => root.ExercisesReducer);
  const [hide, setHide] = useState(false);
  const [selectedValueLevel, setSelectedValueLevel] = useState(""); 

  const handleSelectChangeLevel = (event) => {
    const value = event.target.value; // Lấy giá trị từ event
    setSelectedValueLevel(value); // Cập nhật giá trị được chọn vào state
  };
  let emptyProduct = {
    user_id: "0",
  };

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selectedItem = arrMeal.find((item) => item.meal_id === selectedId);

    if (selectedItem) {
      // Kiểm tra xem đã có trong danh sách chưa
      const idIndex = selectedIds.indexOf(selectedId);
      if (idIndex !== -1) {
        // Nếu đã có, loại bỏ khỏi mảng selectedIds
        const updatedIds = [...selectedIds];
        updatedIds.splice(idIndex, 1);
        setSelectedIds(updatedIds);

        // Loại bỏ khỏi mảng selectedNames theo index tương ứng
        const updatedNames = [...selectedNames];
        updatedNames.splice(idIndex, 1);
        setSelectedNames(updatedNames);
      } else {
        // Nếu chưa có, thêm vào danh sách
        setSelectedIds([...selectedIds, selectedId]);
        setSelectedNames([...selectedNames, selectedItem.meal_name]);
      }
    }
  };

  const [selectedIds1, setSelectedIds1] = useState([]);
  const [selectedNames1, setSelectedNames1] = useState([]);
  const handleSelectChange1 = (event) => {
    const selectedId = event.target.value;
    const selectedItem = arrExercises.find(
      (item) => item.exercise_id === selectedId
    );

    if (selectedItem) {
      const idIndex = selectedIds1.indexOf(selectedId);
      if (idIndex !== -1) {
        const updatedIds = [...selectedIds1];
        updatedIds.splice(idIndex, 1);
        setSelectedIds1(updatedIds);

        const updatedNames = [...selectedNames1];
        updatedNames.splice(idIndex, 1);
        setSelectedNames1(updatedNames);
      } else {
        setSelectedIds1([...selectedIds1, selectedId]);
        setSelectedNames1([...selectedNames1, selectedItem.exercise_name]);
      }
    }
  };
  const uploadFile = (e) => {
    let file = e.target.files[0];
    let fileRef = ref(storage_bucket, file.name);

    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          const updatedProduct = { ...product, image: url }; // Update achivementLogo property in product object
          setProduct(updatedProduct);
        });
      }
    );
  };

  const [formCount, setFormCount] = useState(1);
  const [formData, setFormData] = useState([
    { name: "", description: "", meal_id: "", exercise_id: "", day: "" },
  ]);

  const handleAddForm = () => {
    setFormCount(formCount + 1);
    setFormData([
      ...formData,
      { name: "", description: "", meal_id: "", exercise_id: "", day: "" },
    ]);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newFormData = [...formData];
    newFormData[index][name] = value;
    setFormData(newFormData);
  };

  const handleMealChange = (event, index) => {
    const selectedOption = event.target.value;
    const newFormData = [...formData];
    newFormData[index].meal_id = selectedOption;
    setFormData(newFormData);
  };

  const handleExerciseChange = (event, index) => {
    const selectedOption = event.target.value;
    const newFormData = [...formData];
    newFormData[index].exercise_id = selectedOption;
    setFormData(newFormData);
  };

  const [inputValue, setInputValue] = useState("");
  const [text, setText] = useState("Thêm mới kế hoạch tập luyện");
  const [products, setProducts] = useState([]);
  const [productDialog, setProductDialog] = useState(false);
  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductDialog1, setDeleteProductDialog1] = useState(false);
  const [deleteProductDialog2, setDeleteProductDialog2] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
  const [product, setProduct] = useState(emptyProduct);
  const [tempProduct, setTempProduct] = useState({ ...emptyProduct });
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    const action1 = GetListWorkoutAction();
    dispatch(action1);
    const action = GetListMealAction();
    dispatch(action);

    const action2 = GetListExercisesAction();
    dispatch(action2);
  }, []);
  useEffect(() => {
    setProducts(arrWorkout.filter((item) => item.status === "active"));
  }, [arrWorkout]);

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductDialog1 = () => {
    setDeleteProductDialog1(false);
  };

  const hideDeleteProductDialog2 = () => {
    setDeleteProductDialog2(false);
  };
  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = async () => {
    setSubmitted(true);

    if (product.plan_name) {
      let _products = [...products];
      let _product = { ...product };
      const plan_meal = selectedIds;
      const plan_exercises = selectedIds1;
      const data = await { ...product, plan_meal, plan_exercises };
      if (product.user_id !== "0") {
        const index = findIndexById(product.id);

        _products[index] = _product;
        const action = await UpdateWorkoutAction(data);
        await dispatch(action);
        setProductDialog(false);
        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: `Cập nhật kế hoạch tập luyện ${product.plan_name} thành công`,
          life: 3000,
        });
        setText("Chỉnh sửa kế hoạch tập luyện");
      } else {
        const data1 = await {
          ...product,
          plan_meal,
          plan_exercises,
          fitness_level: selectedValueLevel,
        };
        const action = await CreateWorkoutAction(data1);
        await dispatch(action);
        toast.current.show({
          severity: "success",
          summary: "Thành công",
          detail: "Tạo  mới kế hoạch tập luyện thành công",
          life: 3000,
        });
        setProductDialog(false);
      }

      // setProducts(_products);
      // setProductDialog(false);
      // setProduct(emptyProduct);
    }
  };

  const editProduct = (product) => {
    setText("Chỉnh sửa kế hoạch tập luyện");
    setProduct({ ...product });
    setProductDialog(true);
    setTempProduct({ ...product });
  };

  const deleteProduct = async () => {
    const action = await DeleteWorkoutAction(product.plan_id);
    await dispatch(action);
    setDeleteProductDialog(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "error",
      summary: "Thành công",
      detail: `Xóa kế hoạch tập luyện ${product.plan_name} thành công`,
      life: 3000,
      options: {
        style: {
          zIndex: 100,
        },
      },
    });
  };

  const deleteProduct1 = async () => {
    const plan_meal = selectedIds;
    const plan_exercises = selectedIds1;
    const data = await { ...product, plan_meal, plan_exercises };

    const action = await UpdateWorkoutAction(data);
    await dispatch(action);

    setDeleteProductDialog1(false);
    setProduct(emptyProduct);
    toast.current.show({
      severity: "success",
      summary: "Thành công",
      detail: `Cập nhật kế hoạch tập luyện ${product.plan_name} thành công`,
      life: 3000,
      options: {
        style: {
          zIndex: 100,
        },
      },
    });
  };

  const deleteProduct2 = async () => {
    const updatedFormData = formData.map((formItem) => ({
      ...formItem,
      plan_id: product.plan_id,
    }));

    const data = { plan_daily: updatedFormData };
    setDeleteProductDialog2(false);
    const action = CreateDailyAction(data);
    dispatch(action);
  };
  const findIndexById = (id) => {
    let index = -1;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    setProducts(_products);
    setDeleteProductsDialog(false);
    setSelectedProducts(null);
    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Deleted  Achivement",
      life: 3000,
    });
  };

  const onInputChange = (e, name) => {
    if (name === "achivementLogo") {
      uploadFile(e); // Call uploadFile function when achivementLogo value changes
    }

    const val = (e.target && e.target.value) || "";
    let _product = { ...product };

    _product[`${name}`] = val;

    setProduct(_product);

    const newValue = e.target.value;

    // Kiểm tra xem newValue có chứa các ký tự đặc biệt không mong muốn
    const forbiddenCharacters = /[@!#$%^&*]/g;

    if (!forbiddenCharacters.test(newValue)) {
      setInputValue(newValue);
      // Thực hiện các xử lý khác tại đây
    }
  };
  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const leftToolbarTemplate = () => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          label="Thêm mới"
          icon="pi pi-plus"
          severity="success"
          onClick={() => {
            openNew();
            setText("Thêm mới kế hoạch tập luyện");
            setHide(false);
          }}
        />
        {/* <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} /> */}
      </div>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Tải xuống"
        icon="pi pi-upload"
        style={{ marginRight: "50px" }}
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.image}`}
        alt={rowData.image}
        className="shadow-2 border-round"
        style={{ width: "241px" }}
      />
    );
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const confirmDeleteProduct1 = (product) => {
    setProduct(product);
    setDeleteProductDialog1(true);
  };
  const confirmDeleteProduct2 = (product) => {
    setProduct(product);
    setDeleteProductDialog2(true);
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => {
            editProduct(rowData);
            setHide(true);
          }}
        />

        <Button
          icon="pi-bars"
          rounded
          outlined
          severity="danger"
          onClick={() => {
            confirmDeleteProduct1(rowData);
            setSelectedIds([]);
            setSelectedNames([]);
            setSelectedIds1([]);
            setSelectedNames1([]);
          }}
        />

        <Button
          icon="pi pi-ellipsis-v"
          rounded
          outlined
          severity="danger"
          onClick={() => {
            confirmDeleteProduct2(rowData);
            setSelectedIds([]);
            setSelectedNames([]);
            setSelectedIds1([]);
            setSelectedNames1([]);
            setFormData([
              { name: "", description: "", meal_id: "", exercise_id: "" },
            ]);
          }}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </React.Fragment>
    );
  };

  const formik = useFormik({
    initialValues: {
      plan_name: "",
    },
    onSubmit: (value) => {
      console.log(value);
      const action = SearchWorkoutAction(value);
      dispatch(action);
    },
  });

  const handleDelete = (itemId) => {
    // Xóa phần tử khỏi mảng PlanMeals
    const updatedPlanMeals = product.PlanMeals.filter(
      (item) => item.id !== itemId
    );

    // Cập nhật object product với mảng mới đã xóa phần tử
    const updatedProduct = { ...product, PlanMeals: updatedPlanMeals };
    const action = WorkoutDeleteMealAction(itemId);
    dispatch(action);
    const action1 = GetListWorkoutAction();
    dispatch(action1);
    // Cập nhật state product
    setProduct(updatedProduct);
  };
  const handleDelete1 = (itemId) => {
    // Xóa phần tử khỏi mảng PlanMeals
    const updatedPlanMeals = product.PlanExercises.filter(
      (item) => item.id !== itemId
    );

    // Cập nhật object product với mảng mới đã xóa phần tử
    const updatedProduct = { ...product, PlanExercises: updatedPlanMeals };
    const action = WorkoutDeleteExercisesAction(itemId);
    dispatch(action);
    const action1 = GetListWorkoutAction();
    dispatch(action1);
    // Cập nhật state product
    setProduct(updatedProduct);
  };

  const handleDelete2 = (itemId) => {
    console.log(itemId);

    const updatedPlanMeals = product.DailyPlanDetails.filter(
      (item) => item.detail_id !== itemId
    );

    const updatedProduct = { ...product, DailyPlanDetails: updatedPlanMeals };
    const action = DeleteDailyAction(itemId);
    dispatch(action);
    const action1 = GetListWorkoutAction();
    dispatch(action1);
    setProduct(updatedProduct);
  };
  useEffect(() => {
    if (formik.values.plan_name === "") {
      const action = GetListWorkoutAction();
      dispatch(action);
    }
  }, [formik.values.plan_name]);
  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0 mb-4">Quản lý kế hoạch tập luyện</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <form onSubmit={formik.handleSubmit}>
          <InputText
            style={{ paddingLeft: "30px" }}
            name="plan_name"
            type="search"
            onChange={formik.handleChange}
            placeholder="Tìm kiếm..."
          />
        </form>
      </span>
    </div>
  );
  const productDialogFooter = (
    <React.Fragment>
      <Button label="Hủy bỏ" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Hoàn thành" icon="pi pi-check" onClick={saveProduct} />
    </React.Fragment>
  );
  const deleteProductDialogFooter = (
    <React.Fragment>
      <Button
        label="Đồng ý"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct}
      />
      <Button
        label="Hủy bỏ"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog}
      />
    </React.Fragment>
  );

  const deleteProductDialogFooter1 = (
    <React.Fragment>
      <Button
        label="Đồng ý"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct1}
      />
      <Button
        label="Hủy bỏ"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog1}
      />
    </React.Fragment>
  );
  const deleteProductDialogFooter2 = (
    <React.Fragment>
      <Button
        label="Đồng ý"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteProduct2}
      />
      <Button
        label="Hủy bỏ"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductDialog2}
      />
    </React.Fragment>
  );
  const deleteProductsDialogFooter = (
    <React.Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteSelectedProducts}
      />
    </React.Fragment>
  );

  return (
    <div className="app-main__outer" style={{ margin: "20px 30px" }}>
      <div>
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          <DataTable
            ref={dt}
            value={products}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Đang hiển thị {first} đến {last} trong tổng số {totalRecords} kế hoạch tập luyện"
            header={header}
          >
            <Column
              field="plan_id"
              header="Mã"
              sortable
              style={{ minWidth: "11rem" }}
            ></Column>
            <Column
              field="plan_name"
              header="Kế hoạch"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="goal"
              header="Mục tiêu"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>

            <Column
              field="start_date"
              header="Thời gian bắt đầu"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>

            <Column
              field="end_date"
              header="Thời gian kết thúc"
              sortable
              style={{ minWidth: "12rem" }}
            ></Column>

            <Column
              style={{ minWidth: "12rem" }}
              field="image"
              header="Hình ảnh"
              body={imageBodyTemplate}
            ></Column>

            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "14rem", marginRight: "50px" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={productDialog}
          style={{ width: "80rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header={text}
          modal
          className="p-fluid"
          footer={productDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Kế hoạch tập luyện
            </label>
            <br />
            <InputText
              id="plan_name"
              value={product.plan_name}
              onChange={(e) => onInputChange(e, "plan_name")}
              required
              autoFocus
            />
          </div>

          <div className="field" style={{ marginTop: "20px" }}>
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Thời gian bắt đầu
            </label>
            <br />
            <InputText
              type="date"
              id="start_date"
              value={product.start_date}
              onChange={(e) => onInputChange(e, "start_date")}
              required
              autoFocus
            />
          </div>
          <div className="field" style={{ marginTop: "20px" }}>
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Thời gian kết thúc
            </label>
            <br />
            <InputText
              type="date"
              id="end_date"
              value={product.end_date}
              onChange={(e) => onInputChange(e, "end_date")}
              required
              autoFocus
            />
          </div>
          <div className="field" style={{ marginTop: "20px" }}>
            <label
              htmlFor="processTypeName"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Mức độ
            </label>
            <br />
            <select className="form-control" onChange={handleSelectChangeLevel}>
              <option value="Underweight">Underweight</option>
              <option value="Normal">Normal</option>
              <option value="Overweight">Overweight</option>
              <option value="Obese Level I">Obese Level I</option>
              <option value="Obese Level II">Obese Level II</option>
              <option value="Obese Level III">Obese Level III</option>
            </select>
          </div>
          <div className="field mt-5">
            <label
              htmlFor="description"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Mục tiêu
            </label>
            <InputTextarea
              id="goal"
              value={product.goal}
              onChange={(e) => onInputChange(e, "goal")}
              required
              rows={3}
              cols={20}
            />
          </div>
          <div
            className="field mt-5"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="description"
              className="font-bold"
              style={{ fontWeight: "bold" }}
            >
              Hình ảnh
            </label>
            <div
              style={{
                height: "240px",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <img src={product.image} style={{ height: "100%" }} />
            </div>
            <input type="file" className="image" onChange={uploadFile} />
          </div>

          {hide === false ? (
            <div></div>
          ) : (
            <div>
              {product.PlanExercises?.length !== 0 ? (
                <div style={{ margin: "50px 0", fontWeight: 800 }}>
                  Danh sách bài tập :
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {product.PlanExercises?.map((item, index) => {
              return (
                <div>
                  <img
                    src={item.exercise?.image}
                    style={{ width: "200px", height: "200px" }}
                  />
                  <div style={{ fontWeight: 700, padding: "20px 0" }}>
                    {item.exercise?.exercise_name}
                  </div>
                  <button
                    style={{
                      padding: "5px 10px",
                      color: "wheat",
                      background: "red",
                    }}
                    onClick={() => {
                      handleDelete1(item.id);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              );
            })}
          </div>

          {hide === false ? (
            <div></div>
          ) : (
            <div>
              {product.PlanMeals?.length !== 0 ? (
                <div style={{ margin: "50px 0", fontWeight: 800 }}>
                  Danh sách thực phẩm :
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {product.PlanMeals?.map((item, index) => {
              return (
                <div>
                  <img
                    src={item.meal?.image}
                    style={{ width: "200px", height: "200px" }}
                  />
                  <div style={{ fontWeight: 700, padding: "20px 0" }}>
                    {item.meal?.meal_name}
                  </div>
                  <button
                    style={{
                      padding: "5px 10px",
                      color: "wheat",
                      background: "red",
                    }}
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Xóa
                  </button>
                </div>
              );
            })}
          </div>

          {hide === false ? (
            <div></div>
          ) : (
            <div>
              {product.DailyPlanDetails?.length !== 0 ? (
                <div style={{ margin: "50px 0", fontWeight: 800 }}>
                  Thực đơn, bài tập cho mỗi ngày :
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
          <div>
            {product.DailyPlanDetails?.map((item, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginBottom: "60px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        fontSize: "30px",
                        fontWeight: 800,
                        marginRight: "30px",
                      }}
                    >
                      {item.name}
                    </div>
                    <button
                      style={{
                        padding: "5px 10px",
                        color: "wheat",
                        background: "red",
                      }}
                      onClick={() => {
                        handleDelete2(item.detail_id);
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                  <div style={{ padding: "15px 0" }}>Ngày thứ: {item.day}</div>
                  <div style={{ padding: "15px 0" }}>{item.description}</div>
                  <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "300px" }}>
                      <div>Bài tập: </div>
                      <img
                        src={item.exercise?.image}
                        style={{ width: "250px", height: "200px" }}
                      />
                      <div style={{ fontWeight: 700, padding: "20px 0" }}>
                        {item.exercise?.exercise_name}
                      </div>
                    </div>
                    <div>
                      <div>Thực đơn: </div>
                      <img
                        src={item.meal?.image}
                        style={{ width: "250px", height: "200px" }}
                      />
                      <div style={{ fontWeight: 700, padding: "20px 0" }}>
                        {item.meal?.meal_name}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Thông Báo"
          modal
          footer={deleteProductDialogFooter}
          onHide={hideDeleteProductDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Bạn có chắc chắn muốn xóa kế hoạch tập luyện{" "}
                <b>{product.phan_name}</b>?
              </span>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductDialog1}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Thông Báo"
          modal
          footer={deleteProductDialogFooter1}
          onHide={hideDeleteProductDialog1}
        >
          <div className="confirmation-content">
            <i className=" mr-3" style={{ fontSize: "2rem" }} />
            {product && (
              <div>
                <span>Thêm mới danh sách Thực Phẩm, Bài Tập</span>
                <div style={{ margin: "30px 0" }}>1. Thực Phẩm:</div>
                <div>
                  <select
                    className="form-control"
                    onChange={handleSelectChange}
                    multiple
                  >
                    {arrMeal.map((item, index) => (
                      <option
                        className="form-control"
                        key={index}
                        value={item.meal_id}
                      >
                        {item.meal_name}
                      </option>
                    ))}
                  </select>

                  {/* Hiển thị các lựa chọn đã chọn */}
                  <div>
                    <h4>Các lựa chọn đã chọn:</h4>
                    <ul>
                      {selectedNames?.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ margin: "30px 0" }}>1. Bài Tập:</div>
                <div>
                  <select
                    className="form-control"
                    onChange={handleSelectChange1}
                    multiple
                  >
                    {arrExercises.map((item, index) => (
                      <option
                        className="form-control"
                        key={index}
                        value={item.exercise_id}
                      >
                        {item.exercise_name}
                      </option>
                    ))}
                  </select>

                  <div>
                    <h4>Các lựa chọn đã chọn:</h4>
                    <ul>
                      {selectedNames1?.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog>

        <Dialog
          visible={deleteProductDialog2}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Thêm chi tiết cho từng ngày"
          modal
          footer={deleteProductDialogFooter2}
          onHide={hideDeleteProductDialog2}
        >
          <div>
            {Array.from({ length: formCount }, (_, index) => (
              <div
                key={index}
                className="confirmation-content"
                style={{ borderTop: "1px solid black", marginBottom: "50px" }}
              >
                <div style={{ padding: "20px 0" }}>Tên</div>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData[index]?.name}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <div style={{ padding: "20px 0" }}>Ngày thứ</div>
                <input
                  className="form-control"
                  type="number"
                  name="day"
                  value={formData[index]?.day}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <div style={{ padding: "20px 0" }}>Chi tiết</div>
                <textarea
                  className="form-control"
                  type="text"
                  name="description"
                  value={formData[index]?.description}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <div style={{ margin: "30px 0" }}>Thực Phẩm:</div>
                <div>
                  <select
                    className="form-control"
                    onChange={(e) => handleMealChange(e, index)}
                    value={formData[index]?.meal_id}
                  >
                    <option>Chọn thực phẩm</option>
                    {arrMeal.map((item, exerciseIndex) => (
                      <option
                        className={`form-control ${
                          formData[index]?.meal_id === item.meal_id
                            ? "selected"
                            : ""
                        }`}
                        key={exerciseIndex}
                        value={item.meal_id}
                      >
                        {item.meal_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ margin: "30px 0" }}>Bài Tập:</div>
                <div>
                  <select
                    className="form-control"
                    onChange={(e) => handleExerciseChange(e, index)}
                    value={formData[index]?.exercise_id}
                  >
                    <option>Chọn bài tập</option>
                    {arrExercises.map((item, exerciseIndex) => (
                      <option
                        className={`form-control ${
                          formData[index]?.exercise_id === item.exercise_id
                            ? "selected"
                            : ""
                        }`}
                        key={exerciseIndex}
                        value={item.exercise_id}
                      >
                        {item.exercise_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
            <button onClick={handleAddForm}>Thêm dữ liệu</button>
          </div>
        </Dialog>
        <Dialog
          visible={deleteProductsDialog}
          style={{ width: "32rem" }}
          breakpoints={{ "960px": "75vw", "641px": "90vw" }}
          header="Confirm"
          modal
          footer={deleteProductsDialogFooter}
          onHide={hideDeleteProductsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {product && (
              <span>
                Are you sure you want to delete the selected products?
              </span>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
