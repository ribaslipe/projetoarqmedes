import { Component, ViewChild } from '@angular/core';
import { UsersService } from '../users.service';
import { Usuario } from '../models/Usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { cpfValidator } from 'src/app/shared/cpf.validator';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  users: Usuario[] = [];
  user: Usuario | any;
  userForm: FormGroup | any;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  selectedUser: any;
  operation: string | any;
  closeResult = '';
  searchTerm = '';

  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private modalService: NgbModal,private toastr: ToastrService) {}

  ngOnInit() {
    this.loadUsers();
    this.initializeForm();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  initializeForm(){
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birth: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidator]],
      password: ['', Validators.required],
      profession: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      maritalStatus: ['', Validators.required],
    });
  }

  get filteredUsers() {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onDeleteUser(id: number) {
    const confirmed = confirm('Tem certeza que deseja excluir o usuário?');
    if (confirmed) {
      this.usersService.deleteUser(id).subscribe(
        () => {
          this.users = this.users.filter((user) => user.id !== id);
          this.toastr.success('Usuário cadastrado com sucesso!.', 'Projeto Arq');
          this.loadUsers();
        },
        (error) => {
          this.toastr.error('Ocorreu um erro ao excluir o usuário.', 'Projeto Arq');
          console.error(error);
        }
      );
    }
  }

  async onSubmitUser(type: any) {
    if (this.userForm.valid) {
      if(type == 'edit'){
        const editedUser: Usuario = { ...this.selectedUser, ...this.userForm.value };
        this.usersService.updateUser(editedUser).subscribe(
          updatedUser => {
            this.toastr.success('Usuário atualizado com sucesso.', 'Projeto Arq');
            this.modalService.dismissAll();
            this.loadUsers();
          },
          error => {
            this.toastr.error('Ocorreu um erro ao atualizar o usuário.', 'Projeto Arq');
          }
        );
      }else{

        const cpf = this.userForm.get('cpf').value;
        const email = this.userForm.get('email').value;

        const isValidCPF = await this.usersService.validateCPF(cpf);
        const isValidEmail = await this.usersService.validateEmail(email);

        if (!isValidCPF) {
          this.toastr.error('CPF já cadastrado.', 'Projeto Arq');
          return;
        }

        if (!isValidEmail) {
          this.toastr.error('Email já cadastrado.', 'Projeto Arq');
          return;
        }

        this.usersService.saveUser(this.userForm.value).subscribe(
          saveUser => {
            this.toastr.success('Usuário cadastrado com sucesso.', 'Projeto Arq');
            this.modalService.dismissAll();
            this.loadUsers();
          },
          error => {
            this.toastr.error('Ocorreu um erro ao salvar o usuário.', 'Projeto Arq');
          }
        );
      }

    }
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  openModalView(content: any, user: Usuario) {
    this.selectedUser = user;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = result;
			},
			(reason) => {
			},
		);
	}

  openModalUser(content: any, user: Usuario, type: any) {
    if(type == 'edit'){
      this.selectedUser = user;
      this.userForm = this.formBuilder.group({
        name: [user.name, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
        birth: [user.birth, Validators.required],
        cpf: [user.cpf, [Validators.required, cpfValidator]],
        password: [user.password, Validators.required],
        profession: [user.profession, Validators.required],
        city: [user.city, Validators.required],
        state: [user.state, Validators.required],
        maritalStatus: [user.maritalStatus, Validators.required],
      });
      this.operation = 'edit';
    }else{
      this.initializeForm();
      this.operation = 'save';
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = result;
			},
			(reason) => {
			},
		);
  }

  formatCpf(event: any) {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      event.target.value = value
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      event.target.value = value.slice(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    this.userForm.get('cpf').setValue(event.target.value);
  }

}
