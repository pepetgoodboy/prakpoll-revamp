import { useElectionStore } from '@/store/electionStore';
import Spinner from '../Spinner/Spinner';
import LabelFormAdmin from '../Label/LabelFormAdmin';
import InputFormAdmin from '../Input/InputFormAdmin';
import SelectTypeElection from '../Select/SelectTypeElection';
import SelectEligibilityElection from '../Select/SelectEligibilityElection';
import ButtonFormAdmin from '../Button/ButtonFormAdmin';
import TextAreaFormAdmin from '../Textarea/TextAreaFormAdmin';
import { useEffect } from 'react';

export default function FormAddElection({
  formAction,
  pending,
  handleCandidateChange,
  handleImageChangeLocal,
}) {
  const { candidates, addCandidate, removeCandidate, toggleModalAddElection } =
    useElectionStore();

  useEffect(() => {
    useElectionStore.getState().refreshEligibility();
  }, []);

  return (
    <form
      id="formAddElection"
      name="formAddElection"
      action={formAction}
      className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-200px)]"
    >
      <div className="flex flex-col gap-1">
        <LabelFormAdmin htmlFor="title" text="Nama Pemilihan" />
        <InputFormAdmin
          id="title"
          name="title"
          type="text"
          placeholder="Masukkan nama pemilihan"
        />
      </div>
      <div className="flex flex-col gap-1">
        <LabelFormAdmin htmlFor="type" text="Jenis Pemilihan" />
        <SelectTypeElection />
      </div>
      <div className="flex flex-col gap-1">
        <LabelFormAdmin htmlFor="eligibility" text="Program Studi / UKM" />
        <SelectEligibilityElection />
      </div>
      <div className="flex flex-col gap-1">
        <LabelFormAdmin htmlFor="startDate" text="Waktu Mulai" />
        <InputFormAdmin id="startDate" name="startDate" type="datetime-local" />
      </div>
      <div className="flex flex-col gap-1">
        <LabelFormAdmin htmlFor="endDate" text="Waktu Selesai" />
        <InputFormAdmin id="endDate" name="endDate" type="datetime-local" />
      </div>
      {candidates.map((candidate, index) => (
        <div key={index} className="flex flex-col gap-1">
          <LabelFormAdmin
            htmlFor={`candidateName-${index}`}
            text={`Nama Kandidat ${index + 1}`}
          />
          <InputFormAdmin
            id={`candidateName-${index}`}
            name={`candidates[${index}][name]`}
            type="text"
            value={candidate.name}
            placeholder={`Masukkan Nama Kandidat ${index + 1}`}
            onChange={(e) => handleCandidateChange(e, index)}
          />
          <LabelFormAdmin
            htmlFor={`candidateVision-${index}`}
            text={`Visi Kandidat ${index + 1}`}
          />
          <InputFormAdmin
            id={`candidateVision-${index}`}
            name={`candidates[${index}][vision]`}
            type="text"
            value={candidate.vision}
            placeholder={`Masukkan Visi Kandidat ${index + 1}`}
            onChange={(e) => handleCandidateChange(e, index)}
          />
          <LabelFormAdmin
            htmlFor={`candidateMission-${index}`}
            text={`Misi Kandidat ${index + 1}`}
          />
          <TextAreaFormAdmin
            id={`candidateMission-${index}`}
            name={`candidates[${index}][mission]`}
            type="text"
            value={candidate.mission}
            placeholder="Pisahkan dengan enter jika ada lebih dari satu misi"
            onChange={(e) => handleCandidateChange(e, index)}
          />
        </div>
      ))}
      {candidates.map((_, index) => (
        <div key={`image-${index}`} className="flex flex-col gap-1">
          <LabelFormAdmin
            htmlFor={`candidateImage${index}`}
            text={`Foto Kandidat ${index + 1}`}
          />
          <InputFormAdmin
            id={`candidateImage${index}`}
            name={`candidateImage${index + 1}`}
            type="file"
            onChange={(e) => handleImageChangeLocal(index, e)}
          />
        </div>
      ))}
      <ButtonFormAdmin
        onClick={addCandidate}
        text="Tambah Kandidat"
        variant="secondary"
        hoverVariant="secondary/90"
        className="mt-2"
      />
      {candidates.length > 1 && (
        <ButtonFormAdmin
          onClick={() => removeCandidate(candidates.length - 1)}
          text="Hapus Kandidat Terakhir"
          variant="red-500"
          hoverVariant="red-600"
          className="mt-2"
        />
      )}
      <div className="flex justify-end items-end">
        <div className="flex gap-2">
          <ButtonFormAdmin
            onClick={toggleModalAddElection}
            text="Batal"
            variant="red-500"
            hoverVariant="red-600"
          />
          <div data-testid="button-add-election">
            <ButtonFormAdmin
              type="submit"
              disabled={pending}
              variant="secondary"
              hoverVariant="secondary/90"
              text={
                pending ? (
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                ) : (
                  'Tambah Pemilihan'
                )
              }
            />
          </div>
        </div>
      </div>
    </form>
  );
}
