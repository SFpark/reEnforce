delete from disposition_codes_tmp;
insert into disposition_codes_tmp values(1, 'Citation issued');
insert into disposition_codes_tmp values(2, 'Disabled placard');
insert into disposition_codes_tmp values(3, 'City placard');
insert into disposition_codes_tmp values(4, 'Other permit');
insert into disposition_codes_tmp values(5, 'Meter paid');
insert into disposition_codes_tmp values(6, 'Space empty');
insert into disposition_codes_tmp values(7, 'Space closed');
insert into disposition_codes_tmp values(8, 'Broken meter');
insert into disposition_codes_tmp values(9, 'Commercial vehicle');
insert into disposition_codes_tmp values(10, 'Vehicle attended');
insert into disposition_codes_tmp values(11, 'Vehicle already visited');
insert into disposition_codes_tmp values(12, 'Other');
commit;

alter table disposition_codes_tmp add (SPEC_HANDLING_FLAG VARCHAR2(1));
UPDATE disposition_codes_tmp SET SPEC_HANDLING_FLAG = 'S' WHERE value in (1, 2, 3);
commit;
