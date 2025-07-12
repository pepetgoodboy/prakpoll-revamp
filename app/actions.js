'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import jwt from 'jsonwebtoken';
import { revalidatePath } from 'next/cache';

export async function registerAction(prevData, formData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/register`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          npm: formData.get('npm'),
          password: formData.get('password'),
          verifCode: formData.get('verifCode'),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }

    return { success: true, redirectTo: '/login' };
  } catch (error) {
    console.error('Error checking authentication:', error.message);
    return { success: false, message: error.message };
  }
}

export async function loginAction(prevState, formData) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          npm: formData.get('npm'),
          password: formData.get('password'),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }

    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set('token', data.token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }

    const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
    const role = decoded.role;

    return {
      success: true,
      message: data.message,
      redirectTo: role === 'Admin' ? '/dashboard/admin' : '/dashboard/user',
    };
  } catch (error) {
    console.error('Error checking authentication:', error.message);
    return { success: false, message: error.message };
  }
}

export async function editProfileUser(prevState, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const fullname = formData.get('fullname');
    const ukm = formData.get('ukm');

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/profile/edit`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          fullname,
          ukmId: ukm,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error('Error updating profie', error.message);
    return { success: false, message: error.message };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');

  redirect('/login');
}

export async function getAllUsersAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `token=${token.value}`,
      },
      credentials: 'include',
    });
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error get all users:', error.message);
  }
}

export async function getAllStudyOrPositionAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/study-or-position`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error get all study or position:', error.message);
  }
}

export async function getAllUkmAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/ukm`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error get all ukm:', error.message);
  }
}

export async function addUserAction(prevData, formData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        body: JSON.stringify({
          npm: formData.get('npm'),
          fullname: formData.get('fullname'),
          studyId: formData.get('studyProgramOrPosition'),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }

    revalidatePath('/dashboard/admin/users');
    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error adding user:', error.message);
  }
}

export async function deleteUserAction(prevData, id) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }
    revalidatePath('/dashboard/admin/users');
    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error deleting user:', error.message);
  }
}

export async function getElectionsHomeAction() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/elections/list-home`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const result = await response.json();

    if (!response.ok) {
      return { message: result.message };
    }

    return result.data;
  } catch (error) {
    console.error('Error get all election:', error.message);
  }
}

export async function getAllElectionsAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/elections`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );
    const result = await response.json();

    if (!response.ok) {
      return { message: result.message };
    }

    return result.data;
  } catch (error) {
    console.error('Error get all election:', error.message);
  }
}

export async function getAllElectionsUserAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/elections/list`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );
    const result = await response.json();

    if (!response.ok) {
      return { message: result.message };
    }

    return result.data;
  } catch (error) {
    console.error('Error get all election:', error.message);
  }
}

export async function getElectionByIdAction(id) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/elections/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );
    const result = await response.json();

    if (!response.ok) {
      return { message: result.message };
    }

    return result.data;
  } catch (error) {
    console.error('Error get election:', error.message);
  }
}

export async function deleteElectionAction(prevState, id) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `
      ${process.env.NEXT_PUBLIC_URL}/api/elections/delete/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }

    revalidatePath('/dashboard/admin/pemilihan');

    return { success: true, message: data.message };
  } catch (error) {
    console.error('Error deleting election:', error.message);
  }
}

export async function getAllEligibilityAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/elections/eligibility`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error get all ukm:', error.message);
  }
}

export async function createElectionAction(prevData, formData) {
  try {
    const title = formData.get('title');
    const type = formData.get('type');
    const eligibility = formData.get('eligibility');
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');

    const formattedStartDate = startDate.replace('T', ' ');
    const formattedEndDate = endDate.replace('T', ' ');

    const candidates = [];
    let index = 0;
    while (formData.has(`candidates[${index}][name]`)) {
      const candidate = {
        name: formData.get(`candidates[${index}][name]`),
        vision: formData.get(`candidates[${index}][vision]`),
        mission: formData.get(`candidates[${index}][mission]`),
      };
      candidates.push(candidate);
      index++;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return null;
    }

    const requestBody = new FormData();
    requestBody.append('title', title);
    requestBody.append('type', type);
    requestBody.append('eligibilityId', eligibility);
    requestBody.append('startDate', formattedStartDate);
    requestBody.append('endDate', formattedEndDate);
    requestBody.append('candidates', JSON.stringify(candidates));

    for (let i = 0; i < candidates.length; i++) {
      const image = formData.get(`candidateImage${i + 1}`);
      if (image) {
        requestBody.append(`candidateImage${i + 1}`, image);
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/elections/create`,
      {
        method: 'POST',
        headers: {
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
        body: requestBody,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { message: data.message };
    }

    revalidatePath('/dashboard/admin/pemilihan');
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    console.error('Error add election:', error.message);
  }
}

export async function getElectionResultAdmin(idElection) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/elections/result-admin/${idElection}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message };
    }
    return result.data;
  } catch (error) {
    console.error('Error get election:', error.message);
  }
}

export async function getElectionResultUser(idElection) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/elections/result/${idElection}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message };
    }
    return result.data;
  } catch (error) {
    console.error('Error get election:', error.message);
  }
}

export async function addVoteAction(prevData, electionId, candidateId) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/vote/add/${electionId}/${candidateId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token.value}`,
        },
        credentials: 'include',
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return { message: result.message };
    }

    revalidatePath('/dashboard/user/pemilihan');

    return {
      success: true,
      message: result.message,
      redirectTo: '/dashboard/user/pemilihan',
    };
  } catch (error) {
    console.error('Error add vote:', error.message);
  }
}
